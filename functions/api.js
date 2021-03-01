const axios = require('axios');
const request = require('request');
const fs = require("fs");
const { printViaMail } = require('./print');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const htmlToPdf = async (dvarTorahHtml) => {
    axios.post('https://api.html2pdf.app/v1/generate', {
            html: dvarTorahHtml,
            apiKey,
        }, {responseType: 'arraybuffer'}).then((response) => {
            fs.writeFileSync('out.pdf', response.data);
            printViaMail();
        }).catch((err) => {
            console.log(err.message);
    });
}

const getParasha = async () =>  {
    let response = await axios.get('https://www.hebcal.com/shabbat?cfg=json');
    parasha = response.data.items.find(o => o.category === 'parashat');
    return parasha;
}

const getDvarTorahUrl = async (parasha) =>  {
    let apiSearchUrl = `http://api.serpstack.com/search?access_key=3584e56bfd3f273cf8bfe231a6a5c728&query=דבר תורה קצר לשולחן השבת, פרשת "${parasha.hebrew.replace('פרשת ','')}" - כדורי.נט site:http://www.kaduri.net/`
    let searchList = await axios.get(encodeURI(apiSearchUrl));
    let dvarTorahUrl = searchList.data.organic_results[0].url;
    return dvarTorahUrl;
}

const getDvarTorahPage = async (dvarTorahUrl) =>  {
    let response = await axios.get(dvarTorahUrl);
    return response.data;
}



exports.getParasha = getParasha;
exports.getDvarTorahPage = getDvarTorahPage;
exports.getDvarTorahUrl = getDvarTorahUrl;
exports.htmlToPdf = htmlToPdf;
