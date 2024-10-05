const axios = require('axios');
const ytFinder = require('yt-finder-nextgen');

exports.name = '/video';
exports.index = async (req, res) => {
    const query = req.query.search;
    if (!query) {
        return res.status(400).send({ error: 'parameter "search" is required' });
    }

    try {
        const searchResult = await ytFinder.search(query, 1);
        if (searchResult.length === 0) {
            return res.status(404).send('No videos found');
        }

        const video = searchResult[0];
        const downloadApiUrl = `https://www.noobs-api.000.pe/dipto/alldl?url=${encodeURIComponent(video.url)}`;

        const response = await axios.get(downloadApiUrl);
        const downloadResult = response.data;

        const videoResult = {
            title: downloadResult.Title, 
            downloadUrl: downloadResult.result
        };

        res.json(videoResult);
    } catch (error) {
        res.status(500).json({ error: 'Skill issue' });
    }
};
