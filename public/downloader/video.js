const axios = require('axios');
const { ytdown } = require("nayan-media-downloader");

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

        const videoUrl = videoData.url;
        const videoId = new URL(videoUrl).searchParams.get('v');

        const result = {
            url: `https://youtu.be/${videoId}?si=wLIhI3mr1YV0gl9L`
        };

        const downloadUrl = await ytdown(result.url);
        delete downloadUrl.developer;
        delete downloadUrl.devfb;
        delete downloadUrl.devwp;

        const videoResult = {
            title: downloadUrl.data.title,
            downloadUrl: downloadUrl.data.video,
            time: videoData.time,
            views: videoData.views,
            audio: downloadUrl.data.audio,
            quality: downloadUrl.data.quality,
            channelName: videoData.channelName
        };

        res.json(videoResult);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching video or download URL' });
    }
});
