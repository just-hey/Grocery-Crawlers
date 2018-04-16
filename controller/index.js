const scrapers = require('../scrapers')
const axios = require('axios')

class Controller {
  constructor() {}

  static target(req, res, next) {
    console.log('scrape stores firing?')
    return scrapers.targetScraper.targetScrape()
    .then(products => {
      console.log('products? ',products.length)
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

  static wholeFoods(req, res, next) {
    console.log('scrape stores firing?');
    let { zip } = req.params
    return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    .then(products => {
      console.log('products? ',products.length)
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

  static kroger(req, res, next) {
    console.log('scrape stores firing?')
    let { zip } = req.params
    return scrapers.krogerScraper.krogerScrape(zip)
    .then(products => {
      console.log('products? ',products.length)
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

}

module.exports = Controller
