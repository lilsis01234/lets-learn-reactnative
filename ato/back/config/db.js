const {Sequelize} = require('sequelize');

//Initalisation de la base de donnée
const sequelize = new Sequelize('mysql://127.0.0.1:3306/react_native', { 
  username : 'root', 
  password :'',
  charset: 'utf8mb4'
})

module.exports = sequelize;
