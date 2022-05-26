const puppeteer = require('puppeteer');

const run = async function() {
    // console.log('test');
    const url = 'http://192.168.1.1/login.htm';
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.evaluate(() => {
        const username = document.getElementsByTagName('input');
        const user = username[1].value = 'user';
        const psw = username[2].value = 'user';
    });
    // await page.$eval('#frm > table > tbody > tr:nth-child(4) > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]', (el) => el.value = 'user');
    // await page.waitForTimeout(1000);
    await page.click('#frm > table > tbody > tr:nth-child(5) > td > input');
    await page.waitForTimeout(2000);
    await page.goto('http://192.168.1.1/status/st_arp_tl.htm');
    await page.waitForTimeout(2000);
    const link = await page.evaluate(() => {
        const table = document.querySelector('#newtablelist');
        let devices = [];
        for(let i = 1; i < table.rows.length; i++) {
            if(!table.rows[i].cells[2].innerHTML == '') {
                devices.push(table.rows[i].cells[2].innerHTML);
            } else {
                devices.push('Anonimius');
            }
        }
        return devices;
    });
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screen.png'});

    await browser.close();
    return link;

}

module.exports = {
    run
}
