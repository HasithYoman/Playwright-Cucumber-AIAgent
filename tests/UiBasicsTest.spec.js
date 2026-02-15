const {test, expect} = require('@playwright/test')

test('Browser context playwright test', async ({browser})=>
//async and await is a combination
//await is require when you are performinga actual action
{
    //chrome-plugins/cookies
    const context = await browser.newContext();
    const page=await context.newPage();


    const userName=page.locator('#username');
    const password=page.locator("[type='password']");
    const signIN=page.locator("#signInBtn");
    //await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.goto(
  "https://rahulshettyacademy.com/loginpagePractise/",
  { waitUntil: 'domcontentloaded' }
);

    
    console.log(await page.title());
    await userName.type("rahulshetty");
    await password.type("Learning@830$3mK2");
    await signIN.click();

    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIN.click();

    const cardTitles=page.locator(".card-body a");

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles= await cardTitles.allTextContents();
    console.log(allTitles);
});



test('Google tile test', async ({page})=>
//async and await is a combination
{
    

    await page.goto("https://google.com");
    console.log (await page.title());
    await expect(page).toHaveTitle('Google');
});

test.only('UI Controls', async ({ page }) =>
{
    await page.goto(
      "https://rahulshettyacademy.com/loginpagePractise/",
      { waitUntil: 'domcontentloaded' }
    );

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const clickOK = page.locator("#okayBtn");
    const checkBox= page.locator("//input[@id='terms']")
    const documentLink=page.locator("//a[@class='blinkingText']");
    const userTypeDropDown = page.locator("//select[@class='form-control']");

    await userTypeDropDown.selectOption("consult");
    await page.locator("//span[@class='radiotextsty']").last().click();
    await clickOK.click();
    console.log(await page.locator("//span[@class='radiotextsty']").last().isChecked());
    await expect(page.locator("//span[@class='radiotextsty']").last()).toBeChecked();
    await checkBox.click();
    //check whther checkbox is checked or not
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    //Verify that the checkbox is NOT checked
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
});



test.only('child window handling', async ({ browser }) =>
{

    //comtext for origibal page
    const context = await browser.newContext();
    const page=await context.newPage();
    const userName = page.locator('#username');
    await page.goto(
      "https://rahulshettyacademy.com/loginpagePractise/",
      { waitUntil: 'domcontentloaded' }
    );

    const documentLink=page.locator("//a[@class='blinkingText']");
    const [newPage]=await Promise.all(
    [context.waitForEvent('page'),// listens for child window
    documentLink.click(),])// triggers child window

    await newPage.waitForLoadState(); // optional, ensures page fully loaded

    const text =await newPage.locator(".red").textContent();
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0]
    console.log(domain);
    //use page because of orginal main page
    page.locator("#username").type(domain);
    await page.pause();
    console.log(await page.locator("#username").type(domain));

    

});

