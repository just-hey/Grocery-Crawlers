const express = require('express')
const router = express.Router()
const Controller = require('../controller')

router.get('/target', Controller.target)
router.get('/wholeFoods/:zip', Controller.wholeFoods)
router.get('/kroger/:zip', Controller.kroger)

module.exports = router
