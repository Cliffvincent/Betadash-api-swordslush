const axios = require('axios');

exports.name = '/fbcoverv2';
exports.index = async (req, res) => {
  const { uid, birthday, love, location, hometown, name, follow, gender } = req.query;

  if (!uid || !birthday || !love || !location || !hometown || !name || !follow || !gender) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://deku-rest-api.gleeze.com/canvas/fbcoverv3', {
      responseType: 'arraybuffer',
      params: { uid, birthday, love, location, hometown, name, follow, gender }
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
