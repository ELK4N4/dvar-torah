const express = require("express");
const app = express();
const { getDvarTorahHtml } = require('./functions/html-builder');
const api = require('./functions/api');
require('dotenv').config();

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/:count", async (req, res) => {
    let DEMO = true;
    let dvarTorahUrl;
    let parasha = {
        hebrew: 'פרשת כי תשא'
    };

    if(DEMO) {
        dvarTorahUrl = `http://www.kaduri.net/?CategoryID=477&ArticleID=2564`;
    } else {
        parasha = await api.getParasha();
        dvarTorahUrl = await api.getDvarTorahUrl(parasha);
    }

    let dvarTorahPage = await api.getDvarTorahPage(dvarTorahUrl);
    let dvarTorahHtml = getDvarTorahHtml(parasha, dvarTorahPage, req.params.count);

    await api.htmlToPdf(dvarTorahHtml);

    res.send(dvarTorahHtml);
})

const PORT = process.env.PORT || 3000;

/* Server Listening */
app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write('\033[2J');
    console.clear();
    console.log(`Listening at port ${PORT}...`);
});