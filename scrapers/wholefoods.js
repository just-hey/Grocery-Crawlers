const puppeteer = require('puppeteer')
const currentWeekNumber = require('current-week-number')


const wholefoodsScrape = async (zip) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(`https://www.wholefoodsmarket.com/stores/list`)

  await page.waitForSelector('#edit-field-geo-data-latlon-address')
  await page.focus('#edit-field-geo-data-latlon-address')
  await page.click('#edit-field-geo-data-latlon-address')
  await page.type('#edit-field-geo-data-latlon-address', `${zip}`,{delay: 100})
  await page.keyboard.down('Enter')
  await page.keyboard.up('Enter')
  await page.waitFor(4000)
  await page.waitForSelector('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')
  await page.click('#block-views-80946ef4b139b2cead1c5f9f9cb3d671 > div > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.torn-pod-content > div.storefront-links > a:nth-child(2)')
  await page.waitForSelector('#quicktabs-tabpage-custom_quicktab_sales_coupons-0 > div.torn-pod-content > div > div.view-content')
  let finalInfo = await page.evaluate( async (zip) => {
    let infoNodes = await document.querySelectorAll('#quicktabs-tabpage-custom_quicktab_sales_coupons-0 > div.torn-pod-content > div > div.view-content')
    let infoArray = Array.from(infoNodes[0].childNodes)
    let filtered = infoArray.filter((el, i) => {
      if (i % 2 === 0) return el
    })
    let finalParsed = await filtered.map(node => {
      // console.log(node.childNodes[7].childNodes[0].childNodes[0].childNodes[1].innerHTML)
      let imageStr = node.childNodes[7].childNodes[0].childNodes[0].childNodes[1].innerHTML
      let firstHalf
      let secondHalf
      console.log(node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[0])
      if (!node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[0] || !node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[2]) {

        console.log('dont work')
        return null
      } else {
        console.log('work')
        firstHalf = node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerText
        // console.log(node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[2].innerText)
        secondHalf = node.childNodes[7].childNodes[0].childNodes[0].childNodes[2].childNodes[2].innerText
      }

      let image = imageStr.slice(12, -9)
      let name = node.childNodes[3].innerText.slice(0, -1)
      let price = `Sale ${firstHalf} - ${secondHalf}`
      return { image, name, price, store: 'Whole Foods', zip}
    })
    console.log(finalParsed)
    return finalParsed
  })
  return finalInfo
}
wholefoodsScrape('98177')
  .then( async (arr) => {
    let result = await arr.filter(el => {
      if (el !== null) {
        el.week = currentWeekNumber()
        return el
      }
    })
    console.log(result)
  })

const stringsParser = async (arr) => {
  // console.log(arr)
  let firstCut = arr.map(el => el.text.split('src='))
  // console.log(arr[0]);
  let onlyImgAndText = []
  firstCut.forEach(el => {
    onlyImgAndText.push(el[1])
  })
  let dividedImgAndText = []
  onlyImgAndText.forEach(el => {
    // console.log(el);
    let temp = el.split('alt=')
    dividedImgAndText.push(el.split('alt='))
  })
  let finalParsedObjs = []
  dividedImgAndText.forEach((el, i) => {
    // console.log(el)
    let image = el[0].slice(1, el[0].length-2)
    let name = el[1].slice(1, el[1].length-2).trim()
    let week = currentWeekNumber()
    let zip = 'local'
    finalParsedObjs.push({ image, name, price: arr[i].price, store: 'Target', zip, week })
  })
  return finalParsedObjs
}

module.exports={ wholefoodsScrape, stringsParser }
