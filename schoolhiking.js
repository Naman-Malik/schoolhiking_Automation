// node schoolhiking.js --url=https://www.amazon.in --configg=configg.json --config2=config2.json
let minimist = require('minimist');
let fs = require('fs');
let puppeteer = require('puppeteer');

let args = minimist(process.argv);
let configgJSON = fs.readFileSync(args.configg,"utf-8");
let configgJSO = JSON.parse(configgJSON);

let config2JSON = fs.readFileSync(args.config2,"utf-8");
let config2JSO = JSON.parse(config2JSON);

async function run(){
    let browser = await puppeteer.launch({
        headless:false,
        args: [
            '--start-maximized'
        ],
        defaultViewport: null 
    
    });
    // enter in page
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);
    // clicked to sign in
    await page.waitForSelector("a#nav-link-accountList");
    await page.click("a#nav-link-accountList");
    // enter num
    await page.waitForSelector("input#ap_email");
    await page.type("input#ap_email",configgJSO.phone,{delay:50});
    // press button 
    await page.waitForSelector("input#continue");
    await page.click("input#continue");
    // password
    await page.waitForSelector("input#ap_password");
    await page.type("input#ap_password",configgJSO.password,{delay:50});
    // final sign in button
    await page.waitForSelector("input#signInSubmit");
    await page.click("input#signInSubmit");
    //adding items
    await page.waitForSelector("input#twotabsearchtextbox");
    await page.type("input#twotabsearchtextbox",config2JSO.shoes,{delay:50});
    await page.keyboard.press("Enter");
    // shoes 
    let ctab = await browser.newPage();
    await ctab.bringToFront();
    await ctab.goto("https://www.amazon.in/FURO-Mens-Black-Hiking-Shoe/dp/B07QHF4PNJ/ref=sr_1_1_sspa?crid=21FLBI2PT67IW&dchild=1&keywords=hiking+shoes&qid=1635066680&sprefix=hiking+shoes+%2Caps%2C284&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFQVFdXTkowSDlLVVkmZW5jcnlwdGVkSWQ9QTAzMzY2MjUzVjc3TDJHR01KUzNGJmVuY3J5cHRlZEFkSWQ9QTAwMDMyMDQyWEtDOVRITVMyUERQJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==");
    // await ctab.waitFor("2000");
    await ctab.waitForSelector("select#native_dropdown_selected_size_name");
    await ctab.select('select#native_dropdown_selected_size_name','7UK');
    await ctab.waitForSelector("input#add-to-cart-button");
    await ctab.click("input#add-to-cart-button");
    await ctab.close();
    await page.waitForSelector('input#twotabsearchtextbox');
    const input = await page.$('input#twotabsearchtextbox');
    await input.click({clickCount:3});
    // bag 
    await input.type(config2JSO.bag,{delay:50});
    await page.keyboard.press("Enter");
    ctab = await browser.newPage();
    await ctab.bringToFront();
    await ctab.goto("https://www.amazon.in/Wildcraft-Ltrs-orange-Rucksack-8903338073864/dp/B01G5I8YLC/ref=sr_1_12?crid=36M1ABYSN90SB&dchild=1&keywords=hiking+bag&qid=1635068173&sprefix=hiking+%2Caps%2C409&sr=8-12");
    // await ctab.waitFor("2000");
    await ctab.waitForSelector("input#add-to-cart-button");
    await ctab.click("input#add-to-cart-button");
    await ctab.close();
    await page.waitForSelector('input#twotabsearchtextbox');
    const input1 = await page.$('input#twotabsearchtextbox');
    await input1.click({clickCount:3});
    // jacket 
    await input1.type(config2JSO.jacket,{delay:50});
    await page.keyboard.press("Enter");
    ctab = await browser.newPage();
    await ctab.bringToFront();
    await ctab.goto("https://www.amazon.in/Electric-Heating-Lightweight-Cycling-Black2XL/dp/B09D9128TT/ref=sr_1_9?crid=1I2P0PPQGLZ2K&dchild=1&keywords=hiking+jacket&qid=1635070505&sprefix=hiking+jacket%2Caps%2C730&sr=8-9");
    // await ctab.waitFor("2000");
    await ctab.waitForSelector("input#add-to-cart-button");
    await ctab.click("input#add-to-cart-button");
    await ctab.close();
    await page.waitForSelector('input#twotabsearchtextbox');
    const input2 = await page.$('input#twotabsearchtextbox');
    await input2.click({clickCount:3});
    // pants
    await input2.type(config2JSO.pant,{delay:50});
    await page.keyboard.press("Enter");
    ctab = await browser.newPage();
    await ctab.bringToFront();
    await ctab.goto("https://www.amazon.in/GOKYO-Regular-Fit-Hiking-Cargo/dp/B0917T9P3C/ref=sr_1_2?crid=34X609UWOV05E&dchild=1&keywords=hiking+pant&qid=1635070932&sprefix=hiking+pant%2Caps%2C499&sr=8-2");
    // await ctab.waitFor("2000");
    await ctab.select('select#native_dropdown_selected_size_name','32');
    await ctab.waitForSelector("input#add-to-cart-button");
    await ctab.click("input#add-to-cart-button");
    await ctab.close();
    ctab = await browser.newPage();
    await ctab.bringToFront();
    await ctab.goto("https://www.amazon.in/gp/cart/view.html?ref_=nav_cart");
    //proceed to checkout
    await ctab.waitForSelector("input.a-button-input");
    await ctab.click("input.a-button-input");

    await ctab.waitForSelector("a.a-declarative.a-button-text");
    await ctab.click("a.a-declarative.a-button-text");
    await ctab.close();
    await page.waitForSelector("a#nav-hamburger-menu");
    await page.click("a#nav-hamburger-menu");
    await page.close();
    await page.waitForSelector("a.hmenu-item > a[onclick='$Nav.getNow('signInRedirect')('nav_em_hd_re_signin', '/gp/flex/sign-out.html?action=sign-out&path=%2Fgp%2Fhomepage.html%3F_encoding%3DUTF8%26ref_%3Dnavm_em_signin&signIn=1&useRedirectOnSuccess=1&ref_=nav_em_signout_0_1_1_32', 'nav_em_hd_clc_signin_0_1_1_32')']");
    await page.click("a.hmenu-item > a[onclick='$Nav.getNow('signInRedirect')('nav_em_hd_re_signin', '/gp/flex/sign-out.html?action=sign-out&path=%2Fgp%2Fhomepage.html%3F_encoding%3DUTF8%26ref_%3Dnavm_em_signin&signIn=1&useRedirectOnSuccess=1&ref_=nav_em_signout_0_1_1_32', 'nav_em_hd_clc_signin_0_1_1_32')']");    // await page.click("a#nav-link-accountList");
}
run();