let express = require('express')
let Sequelize = require('sequelize')
let db = require('../models')
let Customer = db.Customer

let router = express.Router()
//route for GET from dbase
router.get('/customers', function(req, res, next) {
    //sort customers based on name
    Customer.findAll( {order: ['name']} ).then( customers => {
        return res.json(customers)
    }).catch( err => next(err))
})

//route for POST - to post new data
router.post('/customers', function(req, res, next) {
    Customer.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)  //400 is bad request from user
        }
        return next(err)
    })
})

//route modify - mark delivered
router.patch('/customers/:id', function(req, res, next) {
    Customer.update( req.body, { where: {id: req.params.id }})
    .then( rowsModified => {
        if (!rowsModified[0]) {
            return res.status(404).send('Not found') //404 is code for not found; customer w/ this ID not found
        }else {
            return res.send('ok')
        }
        
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let message = err.errors.map( (e) => e.message)
            return res.status(400).json(messages) //400 is bad request from user
        }
        return next(err)
    })
})


module.exports = router