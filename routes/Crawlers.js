const express = require('express')
const router = express.Router()
const Controller = require('../controller')


router.get('/:zip', Controller.scrapeStores)


module.exports = router
