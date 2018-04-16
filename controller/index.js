const scrapers = require('../scrapers')
const axios = require('axios')

class Controller {
  constructor() {}

  static kroger(req, res, next) {
    let { zip } = req.params
    return scrapers.krogerScraper.krogerScrape(zip)
    .then(products => {
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

  static target(req, res, next) {
    return scrapers.targetScraper.targetScrape()
    .then(products => {
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

  static wholeFoods(req, res, next) {
    let { zip } = req.params
    return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    .then(products => {
      res.status(200).json({ products })
    })
    .catch(console.error)
  }

}

module.exports = Controller
