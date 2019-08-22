/**
 * Script replicates the manual way of refreshing a
 * ServiceNow developer instance. I know, I'm lazy.
 */
(async () => {
  // load dependencies
  require("dotenv").config();
  const { Builder, By, Key, until } = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  const firefox = require("selenium-webdriver/firefox");

  // Set default screen resolution (for headless instance)
  const screenResolution = {
    width: 1280,
    height: 720
  };

  // Set config variables
  let webdriver = process.env.WEBDRIVER || "chrome";
  let args = ["--headless ", "--disable-web-security"];

  let driver = await new Builder()
    .forBrowser(webdriver)
    .setChromeOptions(
      new chrome.Options()
        .headless()
        .addArguments(args)
        .windowSize(screenResolution)
    )
    .setFirefoxOptions(
      new firefox.Options()
        .headless()
        .addArguments(args)
        .windowSize(screenResolution)
    )
    .build();

  // Refreshing of instance starts here.
  try {
    // Go to servicenow
    await driver.get("https://developer.servicenow.com/");

    // click login link
    await driver.findElement(By.id("dp-hdr-login-link")).click();

    // enter username
    await driver
      .findElement(By.id("username"))
      .sendKeys(`${process.env.EMAIL}`);

    // click next
    await driver.findElement(By.id("usernameSubmitButton")).click();

    // enter password
    let pwd = driver.wait(until.elementLocated(By.id("password")), 5000);
    await driver
      .wait(until.elementIsVisible(pwd), 5000)
      .sendKeys(`${process.env.PASSWORD}`);

    // click sign in
    let signInBtn = driver.wait(
      until.elementLocated(By.id("submitButton")),
      5000
    );
    await driver.wait(until.elementIsVisible(signInBtn), 5000).click();

    // wait for 30 secs to ensure sign in is done
    await driver.wait(
      until.titleIs("Dashboard | ServiceNow Developers"),
      30000
    );

    // go to instances
    await driver.get("https://developer.servicenow.com/app.do#!/instance");

    // wake up instance
    let wakeInstanceBtn = driver.wait(
      until.elementLocated(By.id("instanceWakeUpBtn")),
      1000
    );
    await driver.wait(until.elementIsVisible(wakeInstanceBtn), 1000).click();
  } catch (e) {

  } finally {
    // Wait 5 seconds before terminating Selenium
    setTimeout(async () => {
      await driver.quit();
    }, 5000);
  }
})();
