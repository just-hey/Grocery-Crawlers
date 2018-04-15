const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')

const wholefoodsScrape = async (zip) => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.goto(`https://www.wholefoodsmarket.com/stores/list`)
    await page.waitForSelector('#edit-field-geo-data-latlon-address')
    await page.focus('#edit-field-geo-data-latlon-address')
    await page.click('#edit-field-geo-data-latlon-address')
    await page.type('#edit-field-geo-data-latlon-address', `${zip}`)
    await page.keyboard.down('Enter')
    await page.keyboard.up('Enter')
    await page.waitFor(4000)
    await page.waitForSelector('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')
    await page.click('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')
    await page.waitForSelector('#quicktabs-tabpage-custom_quicktab_sales_coupons-0 > div.torn-pod-content > div > div.view-content')
    let finalInfo = await page.evaluate( async (zip) => {
      try {
        let infoNodes = await document.querySelectorAll('#quicktabs-tabpage-custom_quicktab_sales_coupons-0 > div.torn-pod-content > div > div.view-content')
      }
      catch(error) {
        console.log(error)
      }
      let infoArray = Array.from(infoNodes[0].childNodes)
      let filtered = infoArray.filter((el, i) => {
        if (i % 2 === 0) return el
      })
      try {
        let finalParsed = await filtered.map(node => {
          let imageStr = node.childNodes[7].childNodes[0].childNodes[0].childNodes[1].innerHTML
          let firstHalf
          let secondHalf
          if (!node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[0] || !node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[2]) {
            return null
          } else {
            firstHalf = node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerText
            secondHalf = node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[2].innerText
          }
          let image = `http://${imageStr.slice(12, -9)}`
          let name = node.childNodes[3].innerText.slice(0, -1)
          let price = `Sale ${firstHalf} - ${secondHalf}`
          return { image, name, price, store: 'Whole Foods' }
        })
      }
      catch(error {
        console.log(error);
      })
      return finalParsed
    })
    return formatter(finalInfo, zip)
    browser.close()
  }
  catch(error) {
    console.log('for us!',error)
  }
}

const formatter = async (arr, zip) => {
  let result = await arr.filter(el => {
    if (el !== null) {
      el.week = currentWeekNumber()
      el.zip = zip
      return el
    }
  })
  return result
}


module.exports={ wholefoodsScrape, formatter }
