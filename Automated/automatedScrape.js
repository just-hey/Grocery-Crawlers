const axios = require('axios')
const baseURL = `https://salefinder-server.herokuapp.com/`
const fs = require('fs')
const format = 'utf8'
const dbPath = __dirname + '/zipcodes.json'
const scrapers = require('../scrapers')

const scraperBots = async () => {
  let zipCodeList = JSON.parse(fs.readFileSync(dbPath, format))
  if (zipCodeList.length === 0) process.exit(0)
  let zip = zipCodeList[0]
  return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    .then(products => {
      console.log('wholeFoods scraped',products.length)
      let body = { products }
      return axios.post(`${baseURL}products/add`, body)
    })
    .then(response => {
      console.log(response.data)
      return scrapers.krogerScraper.krogerScrape(zip)
    })
    .then(products => {
      console.log('kroger scraped',products.length)
      let body = { products }
      return axios.post(`${baseURL}products/add`, body)
    })
    .then(response => {
      console.log(response.data)
      return scrapers.targetScraper.targetScrape()
    })
    .then(products => {
      console.log('target scraped',products.length)
      let body = { products }
      return axios.post(`${baseURL}products/add`, body)
    })
    .then(response => {
      console.log(response.data)
      fs.writeFileSync(dbPath, JSON.stringify(zipCodeList.slice(1)), format)
      console.log(zipCodeList, 'Im done!')
      process.exit(0)
    })
    .catch(error => {
      console.log(error)
      console.log('failed')
      process.exit(0)
    })
}

// scraperBots()

module.exports = scraperBots
