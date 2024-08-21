const puppeteer = require("puppeteer");

const url = "https://finance.yahoo.com/topic/stock-market-news/";

/*
  Modifications are needed to this function to get the format of the
  JSON returned to be similar to the one of "documents" in processData.py
*/

const scrapedata = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const allArticles = await page.evaluate(() => {
    const container = document.querySelector("#mrt-node-Fin-Stream");
    const articles = container.querySelectorAll("h3");

    return Array.from(articles)
      .slice(0, 10)
      .map((article) => {
        const title = article.querySelector("a").innerText;
        const link = article.querySelector("a").href;
        return { title, link };
      });
  });
  console.log(JSON.stringify(allArticles));
  await browser.close();
};

scrapedata();
