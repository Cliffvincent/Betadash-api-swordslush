const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const credentials = require(process.env.KEY);
const libraryPath = path.join(__dirname, 'library.json');

// Function to upload a file to Google Drive
async function uploadFileToDrive(fileName) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive']
        });
        const drive = google.drive({ version: 'v3', auth });

        const fileContent = fs.createReadStream(fileName);

        const response = await drive.files.create({
            requestBody: {
                name: path.basename(fileName),
                mimeType: 'application/octet-stream',
            },
            media: {
                mimeType: 'application/octet-stream',
                body: fileContent
            },
            fields: 'id, webViewLink'
        });

        const fileId = response.data.id;

        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const fileResponse = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink'
        });

        const { webViewLink } = fileResponse.data;
        console.log('Uploaded File Link (Public Access):', webViewLink);

        return webViewLink;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw error;
    }
}

// Function to download a file from a URL and save it to the local file system
async function downloadFileFromUrl(url, filePath) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        fs.writeFileSync(filePath, response.data);
        return true;
    } catch (error) {
        console.warn('Error downloading file as ArrayBuffer, switching to stream method:', error);
        try {
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            response.data.pipe(fs.createWriteStream(filePath));
            await new Promise((resolve, reject) => {
                response.data.on('end', resolve);
                response.data.on('error', reject);
            });
            return true;
        } catch (streamError) {
            console.error('Error downloading file as stream:', streamError);
            throw streamError;
        }
    }
}

// API endpoint to handle the file upload process
exports.name = '/gdrive';
exports.index = async (req, res) => {
    const fileUrl = req.originalUrl.split('/gdrive/upload?url=')[1];
    if (!fileUrl) {
        return res.status(400).send('No URL provided.');
    }

    // Helper function to get the file extension from a URL
    function getFileExtension(fileUrl) {
        const pathName = new URL(fileUrl).pathname;
        const parts = pathName.split('.');
        const extension = parts[parts.length - 1];
        return extension.toLowerCase();
    }

    const format = getFileExtension(fileUrl);
    const timestamp = new Date().getTime();
    const fileName = path.join(__dirname, 'uploads', `ccprojects${timestamp}.${format}`);

    try {
        await downloadFileFromUrl(fileUrl, fileName);
        const publicLink = await uploadFileToDrive(fileName);
        res.send(publicLink);
    } catch (error) {
        res.status(500).send('Error processing file: ' + error.message);
    } finally {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }
    }
};
