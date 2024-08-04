const request = require("request");
const cheerio = require("cheerio");
const getReposHtml = require("./reposHtml")
const URL = "https://github.com/topics";
console.log("find data...");

request(URL, function (err, res, body) {
    if (err) {
        console.log("This sate can be not found...");
    } else {
        gethtml(body)
    }
});

function gethtml(body) {
    const $ = cheerio.load(body);
    const path = ".no-underline.d-flex.flex-column.flex-justify-center";
    let findHtml = ($(path));
    for (i=0; i<findHtml.length; i++) {
        let link = ($(findHtml[i]).attr("href"))
        let topics = link.slice(8);
        let funlLinks = `https://github.com${link}`
        getReposHtml(funlLinks, topics);
    }
}