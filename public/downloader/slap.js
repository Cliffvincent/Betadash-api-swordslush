const axios = require('axios');

exports.name = '/slap';
exports.index = async (req, res) => {
  const { uid, uid2 } = req.query;

  if (!uid || !uid2) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-api.gleeze.com/canvas/slap', {
      responseType: 'arraybuffer',
      params: { uid, uid2 }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
