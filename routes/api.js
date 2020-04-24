let express = require('express')
let Sequelize = require('sequelize')
let db = require('../models')
let Customer = db.Customer
var Mailgun = require('mailgun-js');

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
        return next(err) //otherwise pass error to error handler in server.js
    })
})

//route modify - mark delivered
router.patch('/customers/:id', function(req, res, next) {
    Customer.update( req.body, { where: {id: req.params.id }})
    .then( rowsModified => {
        if (!rowsModified[0]) {
            return res.status(404).send('Not found') //404 is code for not found; customer w/ this ID not found
        }else {
        
                const mailgun = require("mailgun-js");
                //const DOMAIN = 'YOUR_DOMAIN_NAME';
                
                const domain = sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org;
                let api_key = '7fe0c716602413900922178eedeff712-f135b0f1-b1ef7764';
            
                //Your sending email address
                //var from_who = 'kjtempas@gmail.com';
            
                const mg = mailgun({apiKey: api_key, domain: DOMAIN});
                const data = {
                  //from: 'Excited User <me@samples.mailgun.org>',
                  //from: 'kjtempas@gmail.com, sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org'
                  from: 'sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org',
                  //to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
                  to: customer.email,
                  subject: 'Hello',
                  text: 'Your bread from Wheatfield\'s Bakery has been delivered!'
                };
                mg.messages().send(data, function (error, body) {
                  console.log(body);
                });
              }
            return res.send('ok')
        }
        
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages) //400 is bad request from user
        }
        return next(err)
    })
})


module.exports = router