const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')

const targetScrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
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
    let finalInfo = await page.evaluate( async () => {
    let infoStringNodes
    let infoStringArr
      try {
        infoStringNodes = await document.querySelectorAll('.product--link')
        infoStringArr = Array.from(infoStringNodes)
        infoStringArr = await infoStringArr.map((el) => {
          let price = el.childNodes[3].childNodes[1].innerText.trim()
          let text = el.childNodes[1].childNodes[1].outerHTML
          return { price, text }
        })
      }
      catch (error) {
        console.log(error)
      }
      return infoStringArr
    })
    return stringsParser(finalInfo)
    browser.close()
  }
  catch(error) {
    console.log('target complete fail error: ', error)
  }
}

const stringsParser = async (arr) => {
  let firstCut = arr.map(el => el.text.split('src='))
  let onlyImgAndText = []
  firstCut.forEach(el => {
    onlyImgAndText.push(el[1])
  })
  let dividedImgAndText = []
  onlyImgAndText.forEach(el => {
    let temp = el.split('alt=')
    dividedImgAndText.push(el.split('alt='))
  })
  let finalParsedObjs = []
  dividedImgAndText.forEach((el, i) => {
    let image = el[0].slice(1, el[0].length-2)
    let name = el[1].slice(1, el[1].length-2).trim()
    let week = currentWeekNumber()
    let zip = 'local'
    finalParsedObjs.push({ image, name, price: arr[i].price, store: 'Target', zip, week })
  })
  return finalParsedObjs
}

module.exports={ targetScrape, stringsParser }
