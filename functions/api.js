const axios = require('axios');
const request = require('request');
const fs = require("fs");
const { printViaMail } = require('./print');

const apiKey = process.env.API_KEY;
    
const htmlToPdf = async (dvarTorahHtml) => {
    var opts = {
        uri: 'https://api.sejda.com/v2/html-pdf',
        headers: {
            'Authorization' : 'Token: ' + apiKey,
        },
        json: {
            'htmlCode': dvarTorahHtml,
            'viewportWidth': 1200
        }
    };

    request.post(opts)
        .on('error', function(err){
            return console.error(err);
        })
        .on('response', function(response) {
            if (response.statusCode === 200) {
                response.pipe(fs.createWriteStream('out.pdf'))
                    .on('finish', printViaMail);
            } else {
                return console.error('Got code: ' + response.statusCode);
            }
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
