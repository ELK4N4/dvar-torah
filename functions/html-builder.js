const { JSDOM } = require( "jsdom" );

const checkLimit = (text) => (text.length > 2500);

const getVorts = (dvarToragPage) => {
    const { window } = new JSDOM(dvarToragPage);
    const $ = require( "jquery" )( window );
    let dvarTorah = [];
    let index = -1;
    $("#ctlBody").find('font').each( function() {
        if($(this).is('[class]') && $(this).is('[color]') && $(this).attr('color') == '#ff0000' ) {
            if(checkLimit($(this).text())) {
                return console.error({error: "too long: " + $(this).text().length});
            }
            dvarTorah.push({
                title: $(this).text(),
                paras: [],
                length: 0
            });
            index++;
        } else if(index >= 0) {
            if(checkLimit($(this).text())) {
                return console.error({error: "too long: " + $(this).text().length});
            }
            dvarTorah[index].paras.push($(this).text());
            dvarTorah[index].length += $(this).text().length;
        }
    })

    return dvarTorah;
}

const sortVorts = (dvarTorah) => {
    dvarTorah.sort((a, b) => parseFloat(a.length) - parseFloat(b.length));
}

const vortsCount = (reqVortsCount, vorts) => {
    let count = reqVortsCount;
    if(vorts.length < count) {
        count = vorts.length;
    }
    return count;
}

function vortsToHtmlBuilder(parasha, vorts, vortsCount){
    const { window } = new JSDOM(`
<!DOCTYPE html>
<html>
    <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    </head>
    <body style="padding: 140px; text-align: right; font-weight: bold; font: 16px 'Arimo', sans-serif;">
        <p dir="rtl">בס"ד</p>
        <h1 dir="rtl" style="text-align: center; font-family: 'Arimo', sans-serif;"><u>דבר תורה - ${parasha.hebrew}</u></h1>
        <p dir="rtl" style="font-size: 16px; font-family: 'Arimo', sans-serif;">שבת שלום!</p>
    </body>
</html>
    `);
    const $ = require( "jquery" )( window );
    for (let i = 0; i < vortsCount; i++) {
        let vort = vorts[i];
        $("h1").append(`<p dir="rtl" style="font-family: 'Arimo', sans-serif; text-align: right; font-size: 21px;"><u>${vort.title}</u></p>`);
        vort.paras.forEach(para => {
            $("h1").append(`<p dir="rtl" style="font-family: 'Arimo', sans-serif; text-align: right; font-size: 21px;">${para}</p>`);
        })
    }
    return $('html').prop('outerHTML');;
}

const getDvarTorahHtml = (parasha, dvarTorahPage, reqVortsCount) => {
    let vorts = getVorts(dvarTorahPage);
    sortVorts(vorts);
    let count = vortsCount(reqVortsCount, vorts);
    return vortsToHtmlBuilder(parasha, vorts, count);
}

exports.getDvarTorahHtml = getDvarTorahHtml;