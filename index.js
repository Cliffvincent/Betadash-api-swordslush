const express = require("express");
const router = require("./api");
const path = require("path");

const app = express();
app.use(express.json());

app.use(router);
app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/cliff.html"));
});

app.get("/lookup", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/stalk/lookup"));
});

app.get("/fbcover", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbcover"));
});

app.get("/scrape", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/scrape"));
});

app.get("/fbpost", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbpost"));
});

app.get("/fbcoverv2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbcoverv2"));
});

app.get("/trash", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/trash"));
});

app.get("/avatar", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/avatar"));
});

app.get("/avatarv2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/avatarv2"));
});

app.get("/blackbox", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/blackbox"));
});

app.get("/blackboxv2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/blackbox2"));
});

app.get("/gogo", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/gogo"));
});

app.get("/gogo2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/gogo2"));
});

app.get("/shorten", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/shorten"));
});

app.get("/hastebin", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/hastebin"));
});

app.get("/gpt3-turbo", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt4"));
});

app.get("/gpt", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt1"));
});

app.get("/gpt4", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt5"));
});

app.get("/gpt4-turbo", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt2"));
});

app.get("/gptfun", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/gpt3"));
});

app.get("/hercai", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/hercai"));
});

app.get("/okeyai", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/chatgpt/okayai"));
});

app.get("/spotify/search", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/spotify"));
});

app.get("/dreamforth", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/df"));
});

app.get("/xyz", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/docs.html"));
});


const { GPTx } = require('@ruingl/gptx');
const socketIo = require('socket.io');
const fs = require("fs");

const server = require('http').createServer(app);
const io = socketIo(server);

/** Create ka ng public folder
/public
     count.json 
or 
/public/count.json lagyan mo ng laman yung count json ng [ ] **/

let requestCount = 0;
const countFilePath = path.join(__dirname, 'public','count.json');

app.use((req, res, next) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.connection.remoteAddress;
requestCount++;
  fs.readFile(countFilePath, 'utf8', (err, data) => {
    if (err) return console.error(err);

    const countData = JSON.parse(data);
    const existingEntry = countData.find(entry => entry.ip === clientIp);

    if (existingEntry) {
      existingEntry.count += 1;  
    } else {
      countData.push({ ip: clientIp, count: 1 });
    }

    fs.writeFile(countFilePath, JSON.stringify(countData, null, 2), (err) => {
      if (err) console.error(err);
    });

    io.emit('updateRequestCount', countData);
    next();
  });
});

const models = {
// NEXTWAY
    'gpt-4': new GPTx({ provider: 'Nextway', model: 'gpt-4' }),
    'gpt-4o-free': new GPTx({ provider: 'Nextway', model: 'gpt-4o-free' }),
    'gemini-pro': new GPTx({ provider: 'Nextway', model: 'gemini-pro' }),
    'gpt-3.5-turbo': new GPTx({ provider: 'Nextway', model: 'gpt-3.5-turbo' }),
    'llama-3.1-405b-instruct-free': new GPTx({ provider: 'Nextway', model: 'llama-3.1-405b-instruct-free' }),

// ARYAHCR
  'gpt-4': new GPTx({ provider: 'Aryahcr', model: 'gpt-4' }),
    'gpt-4-0613': new GPTx({ provider: 'Aryahcr', model: 'gpt-4-0613' }),
    'gpt-4-32k': new GPTx({ provider: 'Aryahcr', model: 'gpt-4-32k' }),
    'gpt-4-32k-0314': new GPTx({ provider: 'Aryahcr', model: 'gpt-4-32k-0314' }),
    'gpt-4-0314': new GPTx({ provider: 'Aryahcr', model: 'gpt-4-0314' }),
    'gpt-3.5-turbo': new GPTx({ provider: 'Aryahcr', model: 'gpt-3.5-turbo' }),
    'gpt-3.5-turbo-16k': new GPTx({ provider: 'Aryahcr', model: 'gpt-3.5-turbo-16k' }),
    'gpt-3.5-turbo-0613': new GPTx({ provider: 'Aryahcr', model: 'gpt-3.5-turbo-0613' }),
    'gpt-3.5-turbo-16k-0613': new GPTx({ provider: 'Aryahcr', model: 'gpt-3.5-turbo-16k-0613' }),
    'gpt-3.5-turbo-0301': new GPTx({ provider: 'Aryahcr', model: 'gpt-3.5-turbo-0301' }),
    'text-davinci-003': new GPTx({ provider: 'Aryahcr', model: 'text-davinci-003' }),
    'text-davinci-002': new GPTx({ provider: 'Aryahcr', model: 'text-davinci-002' }),
    'code-davinci-002': new GPTx({ provider: 'Aryahcr', model: 'code-davinci-002' }),
    'gpt-3': new GPTx({ provider: 'Aryahcr', model: 'gpt-3' }),
    'text-curie-001': new GPTx({ provider: 'Aryahcr', model: 'text-curie-001' }),
    'text-babbage-001': new GPTx({ provider: 'Aryahcr', model: 'text-babbage-001' }),
    'text-ada-001': new GPTx({ provider: 'Aryahcr', model: 'text-ada-001' }),
    'davinci': new GPTx({ provider: 'Aryahcr', model: 'davinci' }),
    'curie': new GPTx({ provider: 'Aryahcr', model: 'curie' }),
    'babbage': new GPTx({ provider: 'Aryahcr', model: 'babbage' }),
    'ada': new GPTx({ provider: 'Aryahcr', model: 'ada' }),
    'babbage-002': new GPTx({ provider: 'Aryahcr', model: 'babbage-002' }),
    'davinci-002': new GPTx({ provider: 'Aryahcr', model: 'davinci-002' }),

// VOIDS
'gpt-4o-mini-free': new GPTx({ provider: 'Voids', model: 'gpt-4o-mini-free' }),
    'gpt-4o-mini': new GPTx({ provider: 'Voids', model: 'gpt-4o-mini' }),
    'gpt-4o-free': new GPTx({ provider: 'Voids', model: 'gpt-4o-free' }),
    'gpt-4-turbo-2024-04-09': new GPTx({ provider: 'Voids', model: 'gpt-4-turbo-2024-04-09' }),
    'gpt-4o-2024-08-06': new GPTx({ provider: 'Voids', model: 'gpt-4o-2024-08-06' }),
    'grok-2': new GPTx({ provider: 'Voids', model: 'grok-2' }),
    'grok-2-mini': new GPTx({ provider: 'Voids', model: 'grok-2-mini' }),
    'claude-3-opus-20240229': new GPTx({ provider: 'Voids', model: 'claude-3-opus-20240229' }),
    'claude-3-opus-20240229-gcp': new GPTx({ provider: 'Voids', model: 'claude-3-opus-20240229-gcp' }),
    'claude-3-sonnet-20240229': new GPTx({ provider: 'Voids', model: 'claude-3-sonnet-20240229' }),
    'claude-3-5-sonnet-20240620': new GPTx({ provider: 'Voids', model: 'claude-3-5-sonnet-20240620' }),
    'claude-3-haiku-20240307': new GPTx({ provider: 'Voids', model: 'claude-3-haiku-20240307' }),
    'claude-2.1': new GPTx({ provider: 'Voids', model: 'claude-2.1' }),
    'gemini-1.5-flash-exp-0827': new GPTx({ provider: 'Voids', model: 'gemini-1.5-flash-exp-0827' }),
    'gemini-1.5-pro-exp-0827': new GPTx({ provider: 'Voids', model: 'gemini-1.5-pro-exp-0827' }),
};

const handle = async (modells, query, res) => {
    const gptx = models[modells];

    const messages = [
        {
            role: 'user',
            content: query
        }
    ];

    try {
        const response = await gptx.ChatCompletion(messages);
        res.json({
            code: 200,
            status: true,
            message: response,
            author: 'Yazky'
      });
    } catch (error) {
        res.status(500).send({
            code: 500,
            status: false,
            message: error.message,
            author: 'Yazky'
      });
    }
};

app.get('/requests', (req, res) => {
  fs.readFile(countFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading request count' });
    } else {
      const requestObj = JSON.parse(data);
      let totalCount = requestObj.reduce((acc, curr) => acc + curr.count, 0);
const jsonData = {
       request: totalCount, 
       data: requestObj,
};
const htmlResponse = 
        `<html>
        <body style="background: linear-gradient(135deg, #181335, #0b0c26); color: white; font-family: monospace; background-size: cover; margin: 0;">
            <pre style="color: #ffd700; font-size: 45px;">${JSON.stringify(jsonData, null, 2)}</pre>
        </body>
        </html>`;
      res.send(htmlResponse);
    }
  });
});


// NEXTWAY

app.get('/gpt-4', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4', query, res);
});

app.get('/gpt-4o-free', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4o-free', query, res);
});

app.get('/gemini-pro', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gemini-pro', query, res);
});

app.get('/gpt-3.5-turbo', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo', query, res);
});

app.get('/llama-3.1-405b-instruct-free', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('llama-3.1-405b-instruct-free', query, res);
});


// ARYAHCR

app.get('/gpt-4-v2', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4', query, res);
});

app.get('/gpt-4-0613', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4-0613', query, res);
});

app.get('/gpt-4-32k', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4-32k', query, res);
});

app.get('/gpt-4-32k-0314', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4-32k-0314', query, res);
});

app.get('/gpt-4-0314', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4-0314', query, res);
});

app.get('/gpt-3.5-turbo', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo', query, res);
});

app.get('/gpt-3.5-turbo-16k', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo-16k', query, res);
});

app.get('/gpt-3.5-turbo-0613', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo-0613', query, res);
});

app.get('/gpt-3.5-turbo-16k-0613', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo-16k-0613', query, res);
});

app.get('/gpt-3.5-turbo-0301', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3.5-turbo-0301', query, res);
});

app.get('/text-davinci-003', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('text-davinci-003', query, res);
});

app.get('/text-davinci-002', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('text-davinci-002', query, res);
});

app.get('/code-davinci-002', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('code-davinci-002', query, res);
});

app.get('/gpt-3', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-3', query, res);
});

app.get('/text-curie-001', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('text-curie-001', query, res);
});

app.get('/text-babbage-001', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('text-babbage-001', query, res);
});

app.get('/text-ada-001', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('text-ada-001', query, res);
});

app.get('/davinci', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('davinci', query, res);
});

app.get('/curie', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('curie', query, res);
});

app.get('/babbage', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('babbage', query, res);
});

app.get('/ada', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('ada', query, res);
});

app.get('/babbage-002', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('babbage-002', query, res);
});

app.get('/davinci-002', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('davinci-002', query, res);
});

// VOIDS

app.get('/gpt-4o-mini-free', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4o-mini-free', query, res);
});

app.get('/gpt-4o-mini', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4o-mini', query, res);
});

app.get('/gpt-4o-freev2', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4o-free', query, res);
});

app.get('/gpt-4-turbo-2024-04-09', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4-turbo-2024-04-09', query, res);
});

app.get('/gpt-4o-2024-08-06', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gpt-4o-2024-08-06', query, res);
});

app.get('/grok-2', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('grok-2', query, res);
});

app.get('/grok-2-mini', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('grok-2-mini', query, res);
});

app.get('/claude-3-opus-20240229', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-3-opus-20240229', query, res);
});

app.get('/claude-3-opus-20240229-gcp', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-3-opus-20240229-gcp', query, res);
});

app.get('/claude-3-sonnet-20240229', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-3-sonnet-20240229', query, res);
});

app.get('/claude-3-5-sonnet-20240620', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-3-5-sonnet-20240620', query, res);
});

app.get('/claude-3-haiku-20240307', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-3-haiku-20240307', query, res);
});

app.get('/claude-2.1', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('claude-2.1', query, res);
});

app.get('/gemini-1.5-flash-exp-0827', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gemini-1.5-flash-exp-0827', query, res);
});

app.get('/gemini-1.5-pro-exp-0827', (req, res) => {
    const query = req.query.ask;
    if (!query) return res.status(400).send('Query parameter "ask" is required');
    handle('gemini-1.5-pro-exp-0827', query, res);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

