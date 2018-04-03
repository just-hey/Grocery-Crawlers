const puppeteer = require('puppeteer')

//foodKick scrape
let foodKickScrape = async (items) => {
  console.log(items);
  //launch without showing a new window on machine
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  let foodKickPromiseCalls = items.map(async (item)  => {
    //gets only sale items
    await page.goto(`https://www.foodkick.com/#!/search/${item}?page=1&filters=departmentFilterGroup%7Cclearall;brandFilterGroup%7Cclearall;showMeOnlyFilterGroup%7Consale`)
    //get all items
    const promiseOfInfo = await page.evaluate(() => {
      let arrayOfStringInfo = []
      let foodInfo = document.querySelectorAll('.product-to-pdp')
      foodInfo.forEach((el, i) => {
        // console.log(el.innerText);
        let foodItem = {i, info:el.innerText}
        arrayOfStringInfo.push(foodItem)
      })
      //to get foodkick image URLs
      let foodImgs = document.querySelectorAll('.product--image')
      foodImgs.forEach((el, i) => {
        let withExtra = el.style.backgroundImage
        //need to remove a few characters from front and back
        let trimmed = withExtra.slice(5, withExtra.length-2)
        arrayOfStringInfo.find(item => {
          if (item.i == i) item.imgURL = trimmed
        })
      })
      return arrayOfStringInfo
    })
    return promiseOfInfo
  })
  console.log('PROMS!',foodKickPromiseCalls)
  return Promise.all(foodKickPromiseCalls)
  .then(completed => {
    return completed
    browser.close()
  })
}

// https://www.foodkick.com + url = image

let itemArr = ['salmon', 'cheese']

foodKickScrape(itemArr)
  .then(result => {
    console.log('final product?',result)
  })
