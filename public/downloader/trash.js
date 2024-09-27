const axios = require('axios');

exports.name = '/trash';
exports.index = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-api.gleeze.com/canvas/trash', {
      responseType: 'arraybuffer',
      params: { uid }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
