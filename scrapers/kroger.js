const puppeteer = require('puppeteer')

let targetScrape = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(`https://weeklyad.target.com/`)
  await page.waitFor('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button')
  await page.click('body > div.contentWrapper > main > div.ng-scope > div > section > div > div > div > section > div.ad-selector.desktop.ng-isolate-scope.single > div > div > div > div > div.content.col-xs-6 > div:nth-child(1) > div > div > p > button')
  await page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope')
  await page.click('body > div.contentWrapper > main > div.ng-scope > div > div.promotion-banner > span.page-category-btn-container > a.category-view.ng-scope')
  await page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > section > div.category-tiles > ul > li:nth-child(6) > div > div')
  await page.click('body > div.contentWrapper > main > div.ng-scope > div > section > div.category-tiles > ul > li:nth-child(6) > div > div')
  await page.waitForSelector('body > div.contentWrapper > main > div.ng-scope > div > section.product-tiles-wrapper.ng-scope > div.product--tiles')
  await page.waitForSelector('.product--list')
  let res = await page.evaluate( async () => {
      let info = await document.querySelector('.product--list')
      let childArr = Array.from(info.children)
      let result = await childArr.map((el, i) => {
        return { i, description: el.innerText }
      })
      let big = await document.querySelectorAll('.product--link')
      big.forEach((el, i) => {
       result[i]['image'] = el.childNodes[1].childNodes[1].childNodes[1].currentSrc
      })
       return result
    })
  return res
}

targetScrape()
  .then(data => {
    console.log('done', data)
    return data
  })
