const { getDvarTorahHtml } = require('./html-builder');
const api = require('./api');

async function generateDvarTorah(count) {
    let dvarTorahUrl;
    let parasha = {
        hebrew: 'פרשת כי תשא'
    };

    if(process.env.DEMO === 'true') {
        dvarTorahUrl = `http://www.kaduri.net/?CategoryID=477&ArticleID=2564`;
    } else {
        parasha = await api.getParasha();
        dvarTorahUrl = await api.getDvarTorahUrl(parasha);
    }

    let dvarTorahPage = await api.getDvarTorahPage(dvarTorahUrl);
    let dvarTorahHtml = getDvarTorahHtml(parasha, dvarTorahPage, count);

    return dvarTorahHtml;
}

exports.generateDvarTorah = generateDvarTorah;