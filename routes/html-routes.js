    
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("admin: ", req.user);
      if(req.user.admin == 1) {
        res.redirect("/kiosk");
      }
      else {
      res.redirect("/index");
      console.log(req.user);
    }
  }
    res.render('index');
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.render('index');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, function(req, res) {db.Transactions.findAll({  
    }).then(function(dbUser){
      var hbsObject = { transactions: dbUser };
      res.render('index',hbsObject);
      });
    });

    app.get("/dashboard", isAuthenticated, function(req,res){
      db.Transactions.findAll({
         where:{userId: req.user.id}
    }).then(function(dbTransactions){
        var hbsObject = { transactions: dbTransactions };
        res.render('layouts/dashboard',hbsObject);
    });
  });

  app.get("/create_account", function(req,res){
      res.render('layouts/create');
  });

  app.get("/user-profile", function(req,res){

    db.User.findAll({
      where:{email: req.user.email}
 }).then(function(dbUser){
     var hbsObject = { user: dbUser };
     res.render('layouts/user-profile',hbsObject);
 });
});

  app.get("/transactions", isAuthenticated, function(req,res){
    db.Transactions.findAll({
       where:{userId: req.user.id}
  }).then(function(dbTransactions){
      var hbsObject = { transactions: dbTransactions };
      res.render('layouts/transactions',hbsObject);
  });
});

app.get("/wizard", function(req,res){

  db.User.findAll({
    where:{email: req.user.email}
}).then(function(dbUser){
   var hbsObject = { user: dbUser };
   res.render('layouts/wizard',hbsObject);
});
});

  app.get("/kiosk", isAuthenticated, function(req, res) {
    db.Transactions.findAll({
 }).then(function(dbTransactions){
     var hbsObject = { transactions: dbTransactions };
     res.render('layouts/kiosk',hbsObject);
 });
});

};