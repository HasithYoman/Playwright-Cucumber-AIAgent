const {test, expect} = require('@playwright/test')


test.only('Browser Context-Validating error login', async({page})=>
{
    await page.goto(
  "https://rahulshettyacademy.com/client/#/auth/login",
  { waitUntil: 'domcontentloaded' }
);

    // const context = await browser.newContext();
    // const page=await context.newPage();

    const Email=page.locator("//input[@id='userEmail']");
    //const Email=page.locator("#userEmail");
    const password=page.locator("//input[@id='userPassword']");
    const Login=page.locator("//input[@id='login']");
    //const titles=page.locator(".card-body b");

    await page.goto(
  "https://rahulshettyacademy.com/client/#/auth/login",
  { waitUntil: 'domcontentloaded' }
);

    await Email.fill("hasithyoman2@gmail.com");
    await password.fill("It19202464@");
    await Login.click();
    //wait until ecerything load(idle)
    await page.waitForLoadState('networkidle');

    const titles= await page.locator(".card-body b").allTextContents();

    console.log(titles);



});



