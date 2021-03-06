const setupChrome = require('./src/utils/setupChrome');
const runWithRetries = require('./src/ikonInteractions/runnerWithRetries');
const loginUtils = require('./src/ikonInteractions/handleLogin');
const delay = require('./src/utils/delay');

const runner = async (logInInfo, mountain, date, buddy, retries) => {
    let browser;
    let page;

    try {
        browser = await setupChrome(false);
        page = await browser.newPage();

        await loginUtils.logInToIkon(page, logInInfo);
        await runWithRetries(page, mountain, date, retries, logInInfo, buddy);
    } catch (e) {
        console.log('Error running program, exiting now');
    }

    try {
        await delay(10000);
        if (page) await page.close();
        if (browser) await browser.close();
    } catch (e) {
        console.log('Error closing page or browser', e);
    }
};

module.exports = runner;

/*
 * More things to do
 *
 * command line arguments?
 * multi-day select
 * input verification
 * search for mountain
 * build it into a webapp?
 * automatically reserve/cancel based on NOAA weather forcast --> build into google calendar
 */
