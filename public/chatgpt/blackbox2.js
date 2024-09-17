const blackbox = require('@ozrageharm/blackbox-ai');

exports.name = '/blackboxv2';
exports.index = async (req, res) => {
    const question = req.query.question;

    if (!question) {
        return res.status(400).json({ error: 'question query parameter is required' });
    }

    try {
        const output = await blackbox.chat(question);
        res.status(200).json({ blackbox: output.data });
    } catch (error) {
        res.status(500).json({ error: 'Error skills issue', details: error.message });
    }
};
