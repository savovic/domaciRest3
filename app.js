var express = require('express');
var app = express();
var studentRouter = require('./routes/studentRouter')
//========================================================================
var studentEntity = require('./model/studentEntity')
var predmetEntity = require('./model/predmetEntity')
var polazeEntity = require('./model/polazeEntity')
var sequelize = require('./model/databaseConnection');





app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/students', studentRouter)

studentEntity.belongsToMany(predmetEntity, {through: polazeEntity});
predmetEntity.belongsToMany(studentEntity, {through: polazeEntity});

sequelize.sync().then(result => {
    console.log('UPISANO!!!');
  }).catch(err => {
    console.log('greska');
})





app.listen(3000)

