const axios = require('axios')
const baseURL = `http://localhost:3000/`
const fs = require('fs')
const format = 'utf8'
const dbPath = __dirname + '/zipcodes.json'

function zipFetch() {
  return axios.get(`${baseURL}users/zips`)
    .then(response => {
      let zipCodeList = JSON.parse(fs.readFileSync(dbPath, format))
      response.data.zipList.forEach(zip => {
        if (!zipCodeList.includes(zip)) zipCodeList.push(zip)
      })
      fs.writeFileSync(dbPath, JSON.stringify(zipCodeList), format)
    })
    .catch(console.error)
}

zipFetch()
