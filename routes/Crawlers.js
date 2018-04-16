const express = require('express')
const router = express.Router()
const Controller = require('../controller')
const BotsTrigger = require('../Automated/automatedScrape')

// router.get('/target/:zip', Controller.target)
// router.get('/wholeFoods/:zip', Controller.wholeFoods)
// router.get('/kroger/:zip', Controller.kroger)

// router.get('/:zip', BotsTrigger.addZip)

module.exports = router
