const axios = require('axios')
const baseURL = `https://salefinder-server.herokuapp.com/`
// const baseURL = 'http://localhost:3000/'
const fs = require('fs')
const format = 'utf8'
const dbPath = __dirname + '/zipcodes.json'
const scrapers = require('../scrapers')

const scraperBots = async () => {
  console.log('scraperBots triggered')
  let zipId
  let zip
  return axios.get(`${baseURL}users/zip`)
    .then(zipReturn => {
      // console.log(zipReturn)
      zipId = zipReturn.data.zip.id
      zip = zipReturn.data.zip.zip
      console.log('return thing is zip? !!!! >>>', zipReturn.data.zip.zip)
      return scrapers.wholefoodsScraper.wholefoodsScrape(zip)
    })
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
      return axios.delete(`${baseURL}users/zip/${zipId}`)
    })
    .then(response => {
      console.log('Im done!', response.data.message)
      process.exit(0)
    })
    .catch(error => {
      console.log(error.message)
      console.log('failed')
      process.exit(0)
    })
}

// scraperBots()



function runZip(req, res, next) {
  let { zip } = req.params
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
    console.log('Im done!', response.data.message)
    let message = response.data.message
    res.status(200).json({ message })
    process.exit(0)
  })
  .catch(error => {
    console.log(error.message)
    console.log('failed')
    process.exit(0)
  })
}

module.exports = { runZip }
