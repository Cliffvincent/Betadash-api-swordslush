const axios = require('axios');

exports.name = '/scrape';
exports.index = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const oxylabsResponse = await axios.post(
            'https://realtime.oxylabs.io/v1/queries',
            {
                source: 'universal',
                url: url
            },
            {
                auth: {
                    username: 'Yugtasj_gsVdT',
                    password: 'Blukai346ghai+'
                },
                headers: {
                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                     'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(oxylabsResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong with the Oxylabs API request' });
    }
};
