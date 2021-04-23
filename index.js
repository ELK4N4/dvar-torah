const express = require("express");
const app = express();
const api = require('./functions/api');
const { generateDvarTorah } = require('./functions/generator');
require('dotenv').config();


app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/:count", async (req, res) => {
    const dvarTorahHtml = await generateDvarTorah(req.params.count);
    await api.printToPdf(dvarTorahHtml);
    res.send(dvarTorahHtml);
})

app.get("/:count/preview", async (req, res) => {
    const dvarTorahHtml = await generateDvarTorah(req.params.count);
    res.send(dvarTorahHtml);
})

const PORT = process.env.PORT || 3000;

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});