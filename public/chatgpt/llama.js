const MSIAI = require('msiai');
const axios = require('axios');

const msiai = new MSIAI();

exports.name = '/llama';
exports.index = async (req, res) => {
    try {
        const userPrompt = req.query.prompt;
        const lang = 'en';

        if (!userPrompt) {
            return res.status(400).send({ error: "Please provide a prompt in the query." });
        }

        const response = await msiai.chat({
            model: "llma",
            prompt: userPrompt,
            system: "you are an AI based on OpenAI's GPT-4 architecture, optimized for providing responses, reasoning, and creative outputs across various tasks. I can assist with writing, coding, problem-solving, and much more. Your function is similar to what Meta-Llama-3.1-70B-Instruct-Turbo would offer, using a large number of parameters to produce detailed and accurate responses quickly.",
            online: true
        });

        const translateThis = response.reply;
        const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(translateThis)}`;

        const translationResponse = await axios.get(translateUrl);
        const retrieve = translationResponse.data;
        let text = '';
        retrieve[0].forEach(item => { if (item[0]) text += item[0]; });
        const fromLang = retrieve[2] === retrieve[8][0][0] ? retrieve[2] : retrieve[8][0][0];

        res.send({ response: text, translatedFrom: fromLang });
    } catch (error) {
        res.status(500).send({ error: "Error processing the request." });
    }
};
