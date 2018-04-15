const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')

const krogerScrape = async (zip) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(`https://wklyads.fredmeyer.com/flyers/fredmeyer-weekly/grid_view/335022?chrome=broadsheet&locale=en-US&postal_code=${zip}&store_code=00013&type=2`)
  await page.waitFor(2000)
  await page.waitForSelector('#wrapper > div.gridview-wrapper > div > div.items-list > div.category-AllCategories > ul')
  let infoArray = await page.evaluate( async () => {
    let info = await document.querySelector('#wrapper > div.gridview-wrapper > div > div.items-list > div.category-AllCategories > ul')
    let childArr = Array.from(info.children)
    let result = await childArr.map((el, i) => {
      let imageStr = el.childNodes[1].childNodes[1].childNodes[1].innerHTML
      let image = imageStr.slice(19,-16)
      let name = el.childNodes[7].innerHTML
      let price = el.childNodes[5].innerText
      if (price === '') return null
      return { image, name, price }
    })
    return result
  })
  let filtered = infoArray.filter(el => {
    if (el !== null) {
      el.zip = zip
      el.store = 'Kroger'
      el.week = currentWeekNumber()
      return el
    }
  })
  return filtered
  browser.close()
}


module.exports={ krogerScrape }
