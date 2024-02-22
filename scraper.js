const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function getListings(city) {
  const browser = await puppeteer.launch({});
  const context = browser.defaultBrowserContext();

  // Get rid of location request and go to google home page
  await context.overridePermissions("https://www.google.com", ["geolocation"]);
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  // Search top home listing websites and get results
  await page.keyboard.type("top home listing websites", { delay: 100 });
  await page.click('input[aria-label="Google Search"]');
  await page.waitForNavigation();

  await page.click('a[href*="trulia.com"]');
  await page.waitForNavigation();

  await page.keyboard.type(city, { delay: 100 });
  await page.click('div[data-testid="location-search-button"]');
  await page.waitForNavigation();

  // Scroll down
  await scrollPageToBottom(page);

  const listingDetails = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('[data-testid="property-card-details"]'),
      (e) => ({
        price: e.querySelector('[data-testid="property-price"]')?.innerText,
        address: e
          .querySelector('[data-testid="property-address"]')
          ?.innerText.replace("\n", " "),
        bedrooms: e.querySelector('[data-testid="property-beds"]')?.innerText,
        baths: e.querySelector('[data-testid="property-baths"]')?.innerText,
        sqft: e.querySelector('[data-testid="property-floorSpace"]')?.innerText,
      })
    )
  );

  await page.screenshot({ path: "example.png" });

  await browser.close();
  return listingDetails;
}

async function scrollPageToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = {
  getListings,
};
