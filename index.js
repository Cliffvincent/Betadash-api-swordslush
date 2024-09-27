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

app.get("/fbpost", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbpost"));
});

app.get("/affect", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/affect"));
});

app.get("/fbcoverv2", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/fbcoverv2"));
});

app.get("/trash", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/trash"));
});

app.get("/paint", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/paint"));
});

app.get("/slap", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/slap"));
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

app.get("/regco", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/regco"));
});

app.get("/spotify/search", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/spotify"));
});

app.get("/video", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/video"));
});

app.get("/dreamforth", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/df"));
});

app.get("/ytdl", async function (req, res) {
  res.sendFile(path.join(__dirname, "/public/downloader/ytdl"));
});

app.get("/xyz", async function (req, res) {
  res.sendFile(path.join(__dirname, "/cliff/docs.html"));
});

app.get("*", async function (req, res) {
  res.sendFile(path.join(__dirname, "cliff/404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
