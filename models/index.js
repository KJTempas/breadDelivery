let Sequelize = require('sequelize')
//setting up sequelize
let env = process.env.NODE_ENV || 'development'
let config = require(__dirname + '/../config.json')[env]

let db = {}

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable],  config)
        
}else {
    sequelize = new Sequelize(config)
}

let model = sequelize['import']('./customer.js')
db[model.name] = model

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db