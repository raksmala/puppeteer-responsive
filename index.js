const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function testResponsive(url) {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 250,
    args: ["--window-size=1920,1080", "--window-position=1921,0"],
  });
  const page = await browser.newPage();

  // Set the viewport to emulate a specific device
  async function setViewport(device) {
    await page.setViewport({
      width: device.width,
      height: device.height,
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      deviceScaleFactor: device.deviceScaleFactor,
    });
    console.log(`Emulating ${device.name}`);
  }

  const devices = [
    {
      name: "Desktop",
      width: 1200,
      height: 800,
      isMobile: false,
    },
    {
      name: "Laptop",
      width: 1024,
      height: 768,
      isMobile: false,
    },
    {
      name: "Tablet",
      width: 768,
      height: 1024,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    },
    {
      name: "Netbook",
      width: 1024,
      height: 600,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
    },
    {
      name: "Tall Phone",
      width: 375,
      height: 1000, // Adjust the height as needed
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    },
    {
      name: "iPhone X",
      width: 375,
      height: 812,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    },
    {
      name: "Wide Desktop",
      width: 1920,
      height: 1080,
      isMobile: false,
    },
    // Add more devices as needed
  ];

  // Create the 'results' folder if it doesn't exist
  const resultsFolder = path.join(__dirname, "results");
  if (!fs.existsSync(resultsFolder)) {
    fs.mkdirSync(resultsFolder);
  }

  const email = "rendya";
  const password = "a";

  try {
    await page.goto(`${url}/wp-login.php`);

    await page.type("input[name='log']", email);
    await page.type("input[name='pwd']", password);

    // Click the login button
    await page.click("input[name='wp-submit']");

    // Wait for navigation or any asynchronous tasks
    await page.waitForNavigation();
    await page.goto(`${url}/`);

    for (const device of devices) {
      await setViewport(device);

      // Add your testing logic here, for example, taking screenshots or checking elements

      // Example: Take a screenshot for each device
      const screenshotPath = path.join(
        resultsFolder,
        `${device.name.replace(" ", "_")}_screenshot.png`
      );
      await page.screenshot({
        path: screenshotPath,
        // fullPage: true, // Optional if you want to go fullscreen screenshot
      });
    }
  } catch (error) {
    console.error("Error during testing:", error);
  } finally {
    await browser.close();
  }
}

// Replace 'https://example.com' with the URL you want to test
testResponsive("http://mdt.local");
