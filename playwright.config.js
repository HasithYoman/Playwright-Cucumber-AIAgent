// // @ts-check
// import { chromium, defineConfig, devices } from '@playwright/test';


// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// const config=({
//   testDir: './tests',
//   timeout: 40*1000,
//   expect:{
//       timeout: 40*1000,
//   },
//   reporter: 'html',
//   use: {
//     browserName: 'firefox',
//     headless : false

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//   },



// });

// module.exports= config;

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 40 * 1000,

  expect: {
    timeout: 40 * 1000,
  },
//here
  reporter: 'html',
  reporter: 'list',

  use: {
    browserName: 'chromium',
    headless: false,
  },

  workers: 1,
});

