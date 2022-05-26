const puppeteer = require('puppeteer');
const run1 = require('./puppeteer');
const express = require('express');
const path = require('path');
const axios = require('axios');
// const crypto = require('crypto');
const app = express();


// cron.schedule(' * * * * *', () => {
//     console.log('hi my name sharof');
// });
app.use(express.json());

const run = async function() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://cabinet.uztelecom.uz/ps/scc/login.php');
    await page.waitForTimeout(1000);
    const element = await page.$('#cryptogram');
    await element.screenshot({path: `screen.png`});
    app.post('/index', async (request, response) => {
        await page.type('#LOGIN', request.body.login);
        await page.type('#passwdId', request.body.pass);
        await page.type('#codeId', request.body.capcha);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(8000);
        const id = await page.evaluate(() => {
            let obj = [];
          const idres = document.querySelector('#main_container > div:nth-child(5) > table > tbody > tr:nth-child(3) > td.grid-cell-fill > div').innerText;
          const money = document.querySelector('#main_container > div:nth-child(5) > table > tbody > tr:nth-child(7) > td.grid-cell-fill > table > tbody > tr > td:nth-child(1) > div').innerText;
            const tarif = document.querySelector('#main_container > div:nth-child(5) > table > tbody > tr:nth-child(5) > td.grid-cell-fill > div').innerText;
          obj.push({id: idres, money: money, tarif: tarif});
          return obj;
        });
        await browser.close();
        return  response.json(id);
    });
};
// await browser.close();
run();





app.use(express.static(__dirname));
app.listen(3000, () => {
   console.log('server is started');
});
// let running = run.run();


// run1.run();