const axios = require('axios');

exports.name = "/video";
exports.index = async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const videoSearchUrl = `https://api-nako-choru-production.up.railway.app/yt?search=${searchQuery}&limit=1`;
        const videoResponse = await axios.get(videoSearchUrl);
        const videoData = videoResponse.data[0];

        if (!videoData) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const downloadUrl = `https://www.noobs-api.000.pe/dipto/alldl?url=${videoData.url}`;
        const downloadResponse = await axios.get(downloadUrl);
        const downloadResult = downloadResponse.data;

        const videoResult = {
            title: downloadResult.Title,
            downloadUrl: downloadResult.result,
        };

        res.json(videoResult);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
