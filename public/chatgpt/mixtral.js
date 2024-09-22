const MSIAI = require('msiai');
const msiai = new MSIAI();
const fetch = require('node-fetch');

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

        const translateThis = response.reply;
        const lang = 'en';
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(translateThis)}`;

        const translationResponse = await fetch(url);
        const body = await translationResponse.json();
        let text = '';
        body[0].forEach(item => (item[0]) ? text += item[0] : '');
        const fromLang = (body[2] === body[8][0][0]) ? body[2] : body[8][0][0];

        res.send({ response: text, fromLang });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};
