const MSIAI = require('msiai');
const request = require('request');

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

        const translateThis = response.reply;
        const lang = 'en'; 
        request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, apiResponse, body) => {
            if (err) return res.status(500).send({ error: "Translation error has occurred!" });

            const retrieve = JSON.parse(body);
            let text = '';
            retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');

            const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];

            res.send({ response: text, fromLang: fromLang });
        });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};
