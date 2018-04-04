const puppeteer = require('puppeteer')

//foodKick scrape
let groceryDeals = async (item) => {
  console.log(item);
  //launch without showing a new window on machine
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(`https://thekrazycouponlady.com/2018/03/31/walgreens-coupon-deals-week-of-4-1`)
  await page.evaluate(() => {

    console.log('so far')
    setTimeout(function () {

      let pageBody = document.querySelector('#react-post-content')
      console.log('body',pageBody)
      console.log('children',pageBody.childNodes)
    }, 9000);
    console.log('outside setTimeout');
    // let nearestStore = storeDetails[0].href
    // return nearestStore
    //form-control ui-autocomplete-input
  })

}



// https://www.foodkick.com + url = image

let item = 'cheese'
let zip = '98177'
groceryDeals(item)
  .then(result => {
    console.log('final product?',result)
  })
