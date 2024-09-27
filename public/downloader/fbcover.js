const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.name = '/fbcover';
exports.index = async (req, res) => {
  const { name, color, address, email, subname, uid, sdt } = req.query;

  if (!name || !color || !address || !email || !subname || !uid || !sdt) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get('https://fbcoverapi.adaptable.app/fbcover', {
      responseType: 'arraybuffer',
      params: { name, color, address, email, subname, uid, sdt },
    });

 
    res.set('Content-Type', 'image/png');
    res.send(response.data);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
