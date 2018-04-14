var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'test', null, { dialect: 'sqlite', storage: './db.test.sqlite' });

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

/*  Create a '/users' route that responds to 
    a GET request with all users in the database */

app.get("/users", function(req, res)
	{
		sequelize.query("SELECT * FROM Users").then(myTableRows => {
  		//console.log(myTableRows);
  		// var userId = myTableRows[0][0].id;
  		// var username = myTableRows[0][0].username;
  		myTableRows[0].map(row => 
  		{
  			var username = row.username;
  			res.status(200).send(username);
  		});
		});
	});

app.get("/", function(req, res)
	{
		res.redirect("/users");
	});


module.exports = { 
  app: app,
  User: User
};
