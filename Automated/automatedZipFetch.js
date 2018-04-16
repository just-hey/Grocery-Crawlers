const axios = require('axios')
const baseURL = `https://salefinder-server.herokuapp.com/`
const fs = require('fs')
const format = 'utf8'
const dbPath = __dirname + '/zipcodes.json'

function zipFetch() {
  console.log('zip fetch triggered')
  return axios.get(`${baseURL}users/zips`)
    .then(response => {
      console.log('api response', response.data.zipList)
      let zipCodeList = JSON.parse(fs.readFileSync(dbPath, format))
      console.log('before check/write ',zipCodeList);
      response.data.zipList.forEach(zip => {
        if (!zipCodeList.includes(zip)) zipCodeList.push(zip)
      })
      fs.writeFileSync(dbPath, JSON.stringify(zipCodeList), format)
      let checker = JSON.parse(fs.readFileSync(dbPath, format))
      console.log('after write',checker)
      return
    })
    .catch(console.error)
}

zipFetch()
