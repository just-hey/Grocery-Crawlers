const scrapers = require('../scrapers')

class Controller {
  constructor() {}

  static scrapeStores(req, res, next) {
    //scrape each store
    console.log('scraping stores', req.params)
    //respond
  }

}

module.exports = Controller
