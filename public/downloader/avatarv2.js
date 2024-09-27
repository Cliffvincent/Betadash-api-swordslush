const axios = require('axios');

exports.name = '/avatarv2';
exports.index = async (req, res) => {
  const { id, bgtext, signature, color } = req.query;

  if (!id || !bgtext || !signature || !color) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-api.gleeze.com/canvas/avatarv2', {
      responseType: 'arraybuffer',
      params: { id, bgtext, signature, color }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};


