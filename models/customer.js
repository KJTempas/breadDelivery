module.exports = (sequelize, DataTypes) => {

    let Customer = sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING,
        }, address: {
            type: DataTypes.STRING,
        }, delivered: {
            type: DataTypes.BOOLEAN,
        }
    })

    Customer.sync({force: true}).then( () => {
        console.log('synced customer table')
    })

    return Customer
}