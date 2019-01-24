const Sequelize = require('sequelize');
const sequelize = require('./databaseConnection')

const PredmetEntity = sequelize.define('predmet', {
   
    naziv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brKredita: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})

module.exports = PredmetEntity;