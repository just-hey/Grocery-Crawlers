const scrapers = require('../scrapers')
const axios = require('axios')

class Controller {
  constructor() {}

  static scrapeStores(req, res, next) {
    let { zip } = req.params
    let products = []
    return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    .then(async (wholeFoodsData) => {
      await wholeFoodsData.forEach(product => products.push(product))
      return scrapers.targetScraper.targetScrape()
    })
    .then(async (targetStoreData) => {
      await targetStoreData.forEach(product => products.push(product))
      return scrapers.krogerScraper.krogerScrape(zip)
    })
    .then(async (krogerStoreData) => {
      await krogerStoreData.forEach(product => products.push(product))
      let body = { products }
      console.log('final scraped product count === ', body.products.length)
      return axios.post(`${process.env.BASE_URL}products/add`, body)
    })
    .then(response => {
      return response.data.message
    })
    .catch(console.error)
  }
}

module.exports = Controller
