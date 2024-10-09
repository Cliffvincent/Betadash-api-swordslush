const axios = require('axios');

exports.name = '/avatar';
exports.index = async (req, res) => {
  const { id, bgname, signature, color } = req.query;

  if (!id || !bgname || !signature || !color) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-apis.ooguy.com/canvas/avatar', {
      responseType: 'arraybuffer',
      params: { id, bgname, signature, color }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
