module.exports = (sequelize, DataTypes) => {

    let Customer = sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Customer.sync({force: false}).then( () => {
        console.log('synced customer table')
    })

    return Customer
}