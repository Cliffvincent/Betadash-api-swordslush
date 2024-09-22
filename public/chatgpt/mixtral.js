const MSIAI = require('msiai');
const request = require('request');

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

        const translateThis = response.reply;
        const lang = 'en';

        request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, _, body) => {
            if (err) return res.status(500).send({ error: "Translation error." });
            const retrieve = JSON.parse(body);
            let text = '';
            retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
            res.send({ response: text });
        });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};
