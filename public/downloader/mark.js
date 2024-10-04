const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');
const axios = require('axios');

const wrapText = (ctx, text, maxWidth) => {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
                line += `${words.shift()} `;
            } else {
                lines.push(line.trim());
                line = '';
            }
        }
        lines.push(line.trim());
        return resolve(lines);
    });
};

exports.name = '/mark'; 
exports.index = async (req, res) => {
    const text = req.query.text;
    if (!text) {
        return res.status(400).send("Missing 'text' query parameter");
    }

    try {
        const imageUrl = 'https://i.imgur.com/3j4GPdy.jpg';
        const imageData = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;

        const pathImg = __dirname + '/mark_image.png';
        fs.writeFileSync(pathImg, Buffer.from(imageData, 'utf-8'));

        const baseImage = await loadImage(pathImg);
        const canvas = createCanvas(baseImage.width, baseImage.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

        ctx.font = '400 45px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'start';

        let fontSize = 45;
        while (ctx.measureText(text).width > 2250) {
            fontSize--;
            ctx.font = `400 ${fontSize}px Arial, sans-serif`;
        }

        const lines = await wrapText(ctx, text, 440);
        ctx.fillText(lines.join('\n'), 95, 420);

        const imageBuffer = canvas.toBuffer('image/png');
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);

        fs.unlinkSync(pathImg);
    } catch (error) {
        res.status(500).send('internal server error');
    }
};
