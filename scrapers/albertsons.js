const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')

const albertsonsScrape = async (zip) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(`http://www.safeway.com/ShopStores/tools/store-locator.page`)

  // await page.waitForSelector('#edit-field-geo-data-latlon-address')
  // await page.focus('#edit-field-geo-data-latlon-address')
  // await page.click('#edit-field-geo-data-latlon-address')
  // await page.type('#edit-field-geo-data-latlon-address', `${zip}`)
  // await page.keyboard.down('Enter')
  // await page.keyboard.up('Enter')
  // await page.waitFor(4000)
  // await page.waitForSelector('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')
  // await page.click('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')

  // let infoArray = await page.evaluate( async () => {
  //   let info = await document.querySelector('')
  //   let childArr = Array.from(info.children)
  //   let result = await childArr.map((el, i) => {
  //     let imageStr = el.childNodes[1].childNodes[1].childNodes[1].innerHTML
  //     let image = imageStr.slice(19,-16)
  //     let name = el.childNodes[7].innerHTML
  //     let price = el.childNodes[5].innerText
  //     if (price === '') return null
  //     return { image, name, price }
  //   })
  //   return result
  // })
  let filtered = infoArray.filter(el => {
    if (el !== null) {
      el.zip = zip
      //store name will change pending on zip! albertsons/safeway/pavillions
      //have to scrape it aswell
      // el.store =
      el.week = currentWeekNumber()
      return el
    }
  })
  return filtered
  browser.close()
}


module.exports={ albertsonsScrape }
