const axios = require('axios')
const target = require('./scrapers/target')
const wholefoods = require('./scrapers/wholefoods')
const kroger = require('./scrapers/kroger')

//notdeployed
const baseURL = 'http://localhost:3000/'

//deployed
//const baseURL ''

// target.targetScrape()
//   .then(data => target.stringsParser(data))
//   .then(products => {
//     let body = { products }
//     return axios.post(`${baseURL}products/add`, body)
//   })
//   .then(res => res)
//   .catch(err => next(err))

let zip = '98177'
kroger.krogerScrape(zip)
  .then(products => {
    console.log(products.length)
    let body = { products }
    return axios.post(`${baseURL}products/add`, body)
  })
  .then(res => {
    console.log('response', res)
    return res
  })
  .catch(console.error)

// let zip = '98177'
// wholefoods.wholefoodsScrape(zip)
//   .then(data => wholefoods.formatter(data, zip))
//   .then(products => {
//     let body = { products }
//     return axios.post(`${baseURL}products/add`, body)
//   })
//   .then(res => {
//     console.log('response!',res)
//     return res
//   })
//   .catch(err => {
//     console.log(err)
//     return err
//   })
