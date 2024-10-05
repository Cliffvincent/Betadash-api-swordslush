const axios = require('axios');
const { SoundCloud } = require('scdl-core');

exports.name = "/video"; 
exports.index = async (req, res) => {
  try {
    const search = req.query.search;
    if (!search) {
      return res.status(400).json({ error: 'Search query parameter is required' });
    }

    const axiosResponse = await 
axios.get(`https://rest-api-production-5054.up.railway.app/soundcloud?query=${search}`);
    const firstUrl = axiosResponse.data.audio_url;

    const permalink = firstUrl;
    const streamOptions = {
      highWaterMark: 1 << 25
    };

    await SoundCloud.connect();
    const stream = await SoundCloud.download(permalink, streamOptions);

    res.setHeader('Content-Type', 'video/mp4');
    stream.pipe(res);

    setTimeout(() => {
      stream.destroy();
    }, 5 * 60 * 1000);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
