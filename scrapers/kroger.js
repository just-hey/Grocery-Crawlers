const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')


let krogerScrape = async (zip) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`https://wklyads.fredmeyer.com/flyers/fredmeyer?type=2&locale=en-US&chrome=broadsheet&force_store_selection=true&postal_code=${zip}&filler=#!/flyers/fredmeyer-weekly?flyer_run_id=334937`)
  await page.waitFor('#postal_code_form > div:nth-child(5) > div > div.submit_postal_code_btn.btn_green')
  await page.click('#postal_code_form > div:nth-child(5) > div > div.submit_postal_code_btn.btn_green')
  await page.waitForSelector('#store_select_area > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > form > button')
  await page.click('#store_select_area > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > form > button')
  await page.waitForSelector('#other_flyer_runs > div > div > div > div.other_flyer_runs_wrapper > table > tbody > tr:nth-child(1) > td.flyer-run-details > a > div > p')
  await page.click('#other_flyer_runs > div > div > div > div.other_flyer_runs_wrapper > table > tbody > tr:nth-child(1) > td.flyer-run-details > a > div > p')
  await page.waitForSelector('#wishabi-flyerarea > div.wishabi-topbar-container.wishabi-topbar-container-broadsheet > div > div.wishabi-broadsheettopbar-submenu > div.wishabi-broadsheettopbar-submenu-extra > div.wishabi-broadsheettopbar-accessibility-area > div.wishabi-broadsheettopbar-grid-view.goog-inline-block.goog-custom-button')
  await page.waitFor(1000)
  await page.click('#wishabi-flyerarea > div.wishabi-topbar-container.wishabi-topbar-container-broadsheet > div > div.wishabi-broadsheettopbar-submenu > div.wishabi-broadsheettopbar-submenu-extra > div.wishabi-broadsheettopbar-accessibility-area > div.wishabi-broadsheettopbar-grid-view.goog-inline-block.goog-custom-button > div > div > div')
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
}

module.exports={ krogerScrape }
