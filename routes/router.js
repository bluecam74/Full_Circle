
var express = require("express");
var Transactions = require("../models/transactions");
var router = express.Router();

router.post("/:id", function (req, res) {
    var query = {_id:req.params.id};
    var approved = req.body.approved;
    console.log(newData);
    
  
    Transactions.update(query, approved, function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect('/kiosk');
      }
    });
  });
  
  module.exports = router;