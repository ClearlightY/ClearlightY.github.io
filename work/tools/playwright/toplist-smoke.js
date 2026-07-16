const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const browserErrors = [];
    const pageErrors = [];
    const failedResponses = [];
    const failedRequests = [];

    page.on('console', message => {
      if (message.type() === 'error') browserErrors.push(message.text());
    });
    page.on('pageerror', error => {
      browserErrors.push(error.message);
      pageErrors.push(error.message);
    });
    page.on('response', response => {
      if (response.status() >= 400) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on('requestfailed', request => {
      const failure = request.failure();
      failedRequests.push(`${failure ? failure.errorText : 'request failed'} ${request.url()}`);
    });

    await page.goto('http://127.0.0.1:4001/toplist/', { waitUntil: 'domcontentloaded' });
    await page.locator('.toplist-page').waitFor({ state: 'visible', timeout: 10000 });

    const pageRoots = await page.locator('.toplist-page').count();
    const dayCount = await page.locator('details.toplist-day').count();
    const latestDay = page.locator('details.toplist-day').first();
    await latestDay.locator('.toplist-hour-btn').first().waitFor({ state: 'visible', timeout: 10000 });
    const latestHourCount = await latestDay.locator('.toplist-hour-btn').count();
    const latestEntryCount = await latestDay.locator('.toplist-hour-panel[aria-hidden="false"] li').count();

    const lazyDay = page.locator('details.toplist-day').nth(1);
    await lazyDay.locator('summary').click();
    await lazyDay.locator('.toplist-hours').waitFor({ state: 'visible', timeout: 10000 });
    const lazyHourCount = await lazyDay.locator('.toplist-hour-btn').count();
    const lazyEntryCount = await lazyDay.locator('.toplist-hour-panel[aria-hidden="false"] li').count();

    const screenshotPath = path.join(os.tmpdir(), 'codex-toplist-smoke.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    const localFailedResponses = failedResponses.filter(item => item.includes('127.0.0.1:4001'));
    const localFailedRequests = failedRequests.filter(item => item.includes('127.0.0.1:4001'));

    if (pageRoots !== 1) throw new Error(`Expected 1 toplist root, got ${pageRoots}`);
    if (dayCount !== 86) throw new Error(`Expected 86 days, got ${dayCount}`);
    if (latestHourCount < 1 || latestEntryCount < 1) throw new Error('Latest day did not render');
    if (lazyHourCount < 1 || lazyEntryCount < 1) throw new Error('Lazy day did not load');
    if (pageErrors.length) throw new Error(`Page errors: ${pageErrors.join(' | ')}`);
    if (localFailedRequests.length) throw new Error(`Failed local requests: ${localFailedRequests.join(' | ')}`);
    if (localFailedResponses.length) throw new Error(`Failed local responses: ${localFailedResponses.join(' | ')}`);

    console.log(JSON.stringify({
      pageRoots,
      dayCount,
      latestHourCount,
      latestEntryCount,
      lazyHourCount,
      lazyEntryCount,
      browserErrors,
      pageErrors,
      failedResponses,
      failedRequests,
      localFailedResponses,
      localFailedRequests,
      screenshotPath,
    }, null, 2));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
