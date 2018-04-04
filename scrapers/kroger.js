const puppeteer = require('puppeteer')

//foodKick scrape
let krogerScrape = async (item, zip) => {
  console.log(item);
  //launch without showing a new window on machine
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(`https://weeklyad.target.com/`)
  await page.waitFor('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button')
  await Promise.all([
    page.click('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button'),
    // page.waitForNavigation({waitUntil: 1000}),
    page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope')
  ])
  await Promise.all([
    page.click('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope'),
    page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > section > div.category-tiles > ul > li:nth-child(6)')
  ])
  await Promise.all([
    console.log('prom3'),
    page.click('body > div.contentWrapper > main > div.ng-scope > div > section > div.category-tiles > ul > li:nth-child(6)'),
    console.log('clicked img?'),
    page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > section.product-tiles-wrapper.ng-scope > div.product--tiles')
  ])
  await Promise.all([
    console.log('prom4'),
    page.evaluate(body => {
      console.log(body)
    }),
  ])
  .catch(console.error)
// body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope

  // let [result2] = await Promise.all([
  //   // page.waitForNavigation({timeout: 10000, waitUntil: 'domcontentloaded'})
  //   page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope > span'),
  //
  //   page.click('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope > span'),
  //   // page.waitForNavigation({timeout: 10000, waitUntil: 'domcontentloaded'})
  //   // ,page.waitFor('#img-5118520 > img')
  //   // ,page.click('#img-5118520 > img')
  // ])
// #img-5118520 > img
  // console.log(result1)

}
//   await page.evaluate((data) => {
//     //collect store url
//     console.log('hi', data)
//     // page.click('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button')
//     // let storeDetails = document.querySelector('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button')
//     // console.log(storeDetails)
//     // storeDetails.click()
// //body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope > span
//     // //
//     // let nearestStore = storeDetails[0].href
//     // return nearestStore
//   })
//
// let item = 'cheese'
// let zip = '98177'
krogerScrape()
  // .then(result => {
  //   console.log('final product?',result)
  // })
