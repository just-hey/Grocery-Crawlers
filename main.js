const axios = require('axios')
const scraper = require('./scrapers/target')
//notdeployed
const baseURL = 'http://localhost:3000/'

//deployed
//const baseURL ''

scraper.targetScrape()
  .then(data => {
    return scraper.stringsParser(data)
  })
  .then(products => {
    console.log('its over?', products)
    let body = { products }
    return axios.post(`${baseURL}products/add`, body)
  })
  .catch(console.error)
