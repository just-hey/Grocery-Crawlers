const express = require('express')
const router = express.Router()

const { krogerScraper, targetScraper, wholefoodsScraper } = require('./scrapers')


//get all products attached to this user's cart
router.get('/registering/:zip', )

//make a new cart for a user
router.post('/new/:userid', CartsController.createCart)

//add a product to a user's cart
// router.post('/add/:userid', CartsController.addToCart)
router.post('/change', CartsController.addOrRemove)

//remove a product from a user's cart
// router.delete('/remove/:userid', CartsController.removeFromCart)


module.exports = router
