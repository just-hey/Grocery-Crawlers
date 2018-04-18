const express = require('express')
const router = express.Router()
const Controller = require('../controller')
const BotsTrigger = require('../Automated/automatedScrape')

router.get('/:zip', BotsTrigger.runZip)

module.exports = router
