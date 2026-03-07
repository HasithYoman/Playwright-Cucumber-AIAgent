const {test, expect} = require('@playwright/test')


test.only('Browser Context-Validating error login', async({page})=>
{
//     await page.goto(
//   "https://rahulshettyacademy.com/client/#/auth/login",
//   { waitUntil: 'domcontentloaded' }
// );

    // const context = await browser.newContext();
    // const page=await context.newPage();

    const productName="ZARA COAT 3";
    const products=page.locator(".card-body");
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

    const count=await products.count();

    for(let i=0; i<count; i++)
    {
      if( await products.nth(i).locator("b").textContent()===productName)
      {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
      }
      
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();



});



