var Sequelize = require('sequelize');
var sequelize = new Sequelize('studenti', 'root', '123marko456', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    operatorsAliases: false
});
//console.log(sequelize);

 module.exports = sequelize;
