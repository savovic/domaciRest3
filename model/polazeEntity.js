const Sequelize = require('sequelize');
const sequelize = require('./databaseConnection');

const PolazeEntity = sequelize.define('polaze', {
   
    ocjena: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

module.exports = PolazeEntity;