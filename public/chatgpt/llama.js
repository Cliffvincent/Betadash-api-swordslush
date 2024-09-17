const MSIAI = require('msiai');

const msiai = new MSIAI();

exports.name = '/llama';
exports.index = async (req, res) => {
    try {
        const userPrompt = req.query.prompt;

        if (!userPrompt) {
            return res.status(400).send({ error: "Please provide a prompt in the query." });
        }

        const response = await msiai.chat({
            model: "llama",
            prompt: userPrompt,
            system: "You are an advanced knowledge assistant designed to provide accurate and detailed responses. Be clear, informative, and ensure your answers are well-supported by evidence",
            online: true
        });

        res.send({ response: response.reply });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};