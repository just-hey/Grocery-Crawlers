const { Cart, User, Product } = require('../models')

class Controller {
  constructor() {}

  static searchByUser(req, res, next) {
    Cart.searchByUser(req.params.userid)
      .then(cart => {
        if (!cart) throw new Error('noCartFound')
        return res.status(200).json({ cart })
      })
      .catch(err => next(err))
  }

}

module.exports = CartsController
