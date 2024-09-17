const MSIAI = require('msiai');

const msiai = new MSIAI();

exports.name = '/mixtral';
exports.index = async (req, res) => {
    try {
        const userPrompt = req.query.prompt;

        if (!userPrompt) {
            return res.status(400).send({ error: "Please provide a prompt in the query." });
        }

        const response = await msiai.chat({
            model: "mixtral",
            prompt: userPrompt,
            system: "You are a versatile assistant providing clear and accurate responses across various topics. Ensure your answers are concise, helpful, and tailored to the user's needs",
            online: true
        });

        res.send({ response: response.reply });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};