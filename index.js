const puppeteeer = require("puppeteer");
(async () => {
  try {
    let url = "https://experts.shopify.com/";
    let browser = await puppeteeer.launch({ headless: true });
    let page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".section");

    const sections = await page.$$(".section");

    for (let i = 0; i < sections.length; i++) {
      await page.goto(url);
      await page.waitForSelector(".section");
      const sections = await page.$$(".section");

      const section = sections[i];
      const button = await section.$("a.marketing-button");
      const buttonName = await page.evaluate(
        button => button.innerText,
        button
      );
      console.log("\n\n\n");

      console.log(buttonName);
      button.click();

      await page.waitForSelector("#ExpertsResults");
      const lis = await page.$$("#ExpertsResults > li");

      //loop over li
      for (const li of lis) {
        const name = await li.$eval("h2", h2 => h2.innerText);
        console.log("name is " + name);
      }
    }
  } catch (e) {
    console.log("our err" + e);
  }
})();
