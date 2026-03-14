const {test, expect} = require('@playwright/test')


test.only('Browser Context-Validating error login', async({page})=>
{
//     await page.goto(
//   "https://rahulshettyacademy.com/client/#/auth/login",
//   { waitUntil: 'domcontentloaded' }
// );

    // const context = await browser.newContext();

    // const page=await context.newPage();

    const email="hasithyoman2@gmail.com";
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

    await Email.fill(email);
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
    await page.locator("text=Checkout").click();
    //pressSequentially help to type omne by one
    await page.locator("//input[@placeholder='Select Country']").pressSequentially('ind', { delay: 150 });
    const dropDown =page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount=await dropDown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
      const text=await dropDown.locator("button").nth(i).textContent();
      if(text.trim() === 'India')
      {
        await dropDown.locator("button").nth(i).click();
        break;
      }
    }
    //await expect(page.locator(".user__name [type='text']")).toHaveText(email);
    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator(".action__submit ").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
      const rowOrderId=await rows.nth(i).locator("th").textContent();
      if(orderId.includes(rowOrderId))
      {
        await rows.nth(i).locator("button").first().click();
        break;

      }
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    //await page.pause();

    



});



