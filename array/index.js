const request = require("request");
const cheerio = require("cheerio");
const URL = "https://www.screener.in/company/ZOMATO/consolidated/";

request(URL, function (err, rep, body) {
    if (err) {
        console.log("This site can be not found plessh try agan...");
    } else {
        findhtml(body);
    }
});

function findhtml(body) {
    const html  = cheerio.load(body);
    const path = "h2";
    let data = html(path)
    for (i=0; i< data.length; i++) {
        console.log((html(data[i])).text());
    }
}