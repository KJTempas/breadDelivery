let express = require('express')
let db = require('../models')
let Customer = db.Customer

let router = express.Router()
//route for GET from dbase
router.get('/customers', function(req, res, next) {
    Customer.findAll().then( customers => {
        return res.json(customers)
    })
})
//route for POST - to post new data
router.post('/customers', function(req, res, next) {
    Customer.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    })
})

module.exports = router