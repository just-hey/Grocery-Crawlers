const axios = require('axios')
const baseURL = `https://salefinder-server.herokuapp.com/`
const fs = require('fs')
const format = 'utf8'
const dbPath = __dirname + '/zipcodes.json'
const scrapers = require('../scrapers')

const scraperBots = async () => {
  console.log('scraperBots triggered');
  let zipCodeList = JSON.parse(fs.readFileSync(dbPath, format))
  console.log('zip list: ',zipCodeList)
  if (zipCodeList.length === 0) process.exit(0)
  let zip = zipCodeList[0]
  let newList = zipCodeList.slice(1)
  fs.writeFileSync(dbPath, JSON.stringify(newList), format)
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
      if (zipCodeList[0] === zip) {
        fs.writeFileSync(dbPath, JSON.stringify(newList), format)
      }
      console.log(zipCodeList, 'Im done!')
      process.exit(0)
    })
    .catch(error => {
      console.log(error)
      console.log('failed')
      process.exit(0)
    })
}

scraperBots()

// function addZip(req, res, next) {
//   let { zip } = req.params
//   let zipCodeList = JSON.parse(fs.readFileSync(dbPath, format))
//   let message
//   if (!zipCodeList.includes(zip)) {
//     let newList = zipCodeList.unshift(zip)
//     fs.writeFileSync(dbPath, JSON.stringify(newList), format)
//   } else {
//
//   }
//   return res.status(200).json({ message: 'Zip added to front of line...' })
// }
