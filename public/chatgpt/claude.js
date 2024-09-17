const MSIAI = require('msiai');

const msiai = new MSIAI();

exports.name = '/claude-3-haiku';
exports.index = async (req, res) => {
    try {
        const userPrompt = req.query.prompt;

        if (!userPrompt) {
            return res.status(400).send({ error: "Please provide a prompt in the query." });
        }

        const response = await msiai.chat({
            model: "claude-3-haiku",
            prompt: userPrompt,
            system: "You are a poetic assistant providing concise and elegant responses in the form of haiku. Your replies should be thoughtful, evocative, and capture the essence of the user's inquiry",
            online: true
        });

        res.send({ response: response.reply });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};
