const axios = require('axios');

exports.name = '/fbpost';
exports.index = async (req, res) => {
  const { uid, text, name } = req.query;

  if (!uid || !text || !name) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-api.gleeze.com/canvas/fbpost', {
      responseType: 'arraybuffer',
      params: { uid, text, name }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
