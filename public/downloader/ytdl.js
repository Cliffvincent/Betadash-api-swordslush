const { ytdown } = require("nayan-media-downloader");

exports.name = "/ytdl"; 
exports.index = async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send({"Error: Missing 'url' query parameter"});
    }

    try {
        const response = await ytdown(videoUrl);

        delete response.developer;
        delete response.devfb;
        delete response.devwp;

        res.json(response);
    } catch (error) {
        res.status(500).send("Error downloading video");
    }
};
