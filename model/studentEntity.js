const Sequelize = require('sequelize');
const sequelize = require ('./databaseConnection');//nije samo konekcija vec citav environment

const StudentEntity = sequelize.define('student', {
    ime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prezime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brIndexa: {
        type : Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

    
module.exports = StudentEntity;

