const scrapers = require('../scrapers')
const axios = require('axios')

class Controller {
  constructor() {}

  static scrapeStores(req, res, next) {
    console.log('scrape stores firing?');
    let { zip } = req.params
    let products = []
    return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    .then(async (wholeFoodsData) => {
      console.log('wholeFoods length', wholeFoodsData.length);
      await wholeFoodsData.forEach(product => products.push(product))
      console.log('target firing');
      return scrapers.targetScraper.targetScrape()
    })
    // .then(async (targetStoreData) => {
    //   console.log('target fired');
    //   await targetStoreData.forEach(product => products.push(product))
    //   return scrapers.krogerScraper.krogerScrape(zip)
    // })
    // .then(async (krogerStoreData) => {
    //   console.log('kroger fired');
    //   await krogerStoreData.forEach(product => products.push(product))
    //   let body = { products }
    //   console.log('final scraped product count === ', body.products.length)
    //   return axios.post(`${process.env.BASE_URL}products/add`, body)
    // })
    .then(async (targetStoreData) => {
      console.log('target length', targetStoreData.length);
      await targetStoreData.forEach(product => products.push(product))
      console.log('after both stores?',products.length)
      let body = {products}
      return axios.post(`https://salefinder-server.herokuapp.com/products/add`, body)
      // return axios.post(`${process.env.BASE_URL}products/add`, body)
    })
    .then(response => {
      console.log('response',response.data.message)
      return response.data.message
    })
    .catch(console.error)
  }
}

module.exports = Controller
