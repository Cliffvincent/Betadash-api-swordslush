const MSIAI = require('msiai');

const msiai = new MSIAI();

exports.name = '/gpt4o';
exports.index = async (req, res) => {
    try {
        const userPrompt = req.query.prompt;

        if (!userPrompt) {
            return res.status(400).send({ error: "Please provide a prompt in the query." });
        }

        const response = await msiai.chat({
            model: "gpt-4o-mini",
            prompt: userPrompt,
            system: "You are a helpful assistant designed to provide accurate and clear information on a wide range of topics. Be concise, friendly, and professional in your responses",
            online: true
        });

        res.send({ response: response.reply });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};