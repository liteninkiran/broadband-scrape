
    const puppeteer = require('puppeteer');

    (async () => {

        const browser = await puppeteer.launch( /* { headless:false } */ );
        const page = await browser.newPage();

        const url = 'https://checker.ofcom.org.uk/broadband-coverage';
        const postcode = 'NN1 5NS';

        await page.goto(url);

        await page.type('[name="postcode"]', postcode);

        // Take a screenshot
        await page.screenshot({ path: 'search.png' });

        // Click "Set Postcode"
        try
        {
            await Promise.all(
            [
                page.click('.change-location'),
                page.waitForSelector('.details-page', { timeout: 15000 })
            ]);
        }
        catch(err)
        {
            await page.close();
            await browser.close();
        }

        // Take a screenshot
        await page.screenshot({path: 'results.png'});

        // Close the browser
        await browser.close();

    })();
