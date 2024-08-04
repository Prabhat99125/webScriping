const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function getReposHtml(url, topics) {
    const fullPath = require("path").join(__dirname, topics);
    console.log(fullPath);
    request(url, function (err, res, body) {
        if (err) {
            console.log("err 1");
        } else {
            getReposLink(body);
        }
    });

    function getReposLink(body) {
        let $ = cheerio.load(body);
        let path = ".f3.color-fg-muted.text-normal.lh-condensed a";
        let findHtml = $(path);
        let link = ($(findHtml[1]).attr("href"));
        reposName = ($(findHtml[1]).text());
        let fulLink = `https://github.com${link}/issues`;
        getissueReq(fulLink);
    }

    function getissueReq(fulLink) {
        request(fulLink, function (err, res, body) {
            if (err) {
                console.log("err 2");
            } else {
                getissue(body);
            }
        });
        
        function getissue(body) {
            let $ = cheerio.load(body);
            let path = ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title";
            let findHtml = $(path);
            fs.mkdirSync(fullPath)
            fs.appendFileSync(`${fullPath}/issus.txt`, `${topics}\n`);
            for (i = 0; i < 8; i++) {
                let links = `https://github.com${($(findHtml[i]).attr("href"))}`;
                fs.appendFileSync(`${fullPath}/issus.txt`, `${links}\n`);
                issuArr = links;
            }
            console.log("done..");
        }
    }
}
module.exports = getReposHtml;