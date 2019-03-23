// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, function(req, res) {db.Transactions.findAll({  
    }).then(function(dbUser){
      var hbsObject = { transactions: dbUser };
      res.render('index',hbsObject);
      });
    });

  app.get("/transactions", isAuthenticated, function(req,res){
    db.Transactions.findAll({
       where:{UserId: req.user.id}
  }).then(function(dbTransactions){
      var hbsObject = { transactions: dbTransactions };
      res.render('transactions',hbsObject);
  });
});

  app.get("/kiosk", isAuthenticated, function(req, res) {
    db.Transactions.findAll({
 }).then(function(dbTransactions){
     var hbsObject = { transactions: dbTransactions };
     res.render('kiosk',hbsObject);
 });
});

};
