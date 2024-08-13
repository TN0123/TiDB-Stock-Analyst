const puppeteer = require("puppeteer");

const url = "https://finance.yahoo.com/topic/stock-market-news/";

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
        return { title };
      });
  });
  console.log(JSON.stringify(allArticles));
  await browser.close();
};

scrapedata();
