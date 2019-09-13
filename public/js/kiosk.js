$(document).ready(function() {
  

  
  $("#approve").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("approved clicked");
    var id = $(this).data("id");
    console.log("this id: ", id);
 
    var newApproved = {
      approved: 1
    };

      $.ajax({
        method: "PUT",
        url: "/update/kiosk/" + id,
        data: newApproved
      })
          .then(function (resp) {
              getNewPoints(id);
              window.setTimeout(function () {
                  window.location.assign("/kiosk")
              }, 200)
          })
          .catch(function (err) {
              console.error(err);
          })
    });


    function getTotalPoints(newPoints, user) {
      console.log("getTotal: ", user)
      $.get("/update/points/" + user).then(function(data) {
      var points = data.points;
      console.log("kiosk.js points: ", points);
      console.log(data);
      console.log(data.email);
      var newTotal = points + newPoints;
      console.log("newPoints: ", newPoints);
      console.log("newTotal: ", newTotal);
      var newData = {
        points: newTotal
      }
      $.ajax({
        method: "PUT",
        url: "/update/points/" + user,
        data: newData
      })
          .then(function (resp) {
             console.log(resp);
             $.get("/update/points/" + user).then(function(data) {
              var points = data.points;
              console.log("kiosk.js points 2: ", points);
          })
        })
          .catch(function (err) {
              console.error(err);
          })
    });
  }


 function getNewPoints(id) {
    console.log("getnewpoints read", id);
    $.get("/api/transactions/" + id, function(data) {
      var amount = data.amount;
      var user = Number(data.userId);
      console.log("user ID: ", user);
      var newPoints = Math.round(amount*10);
      console.log("New Points: ", newPoints);
      getTotalPoints(newPoints, user);
    });
  }
  

    $("#deny").on("click", function (e) {
      e.preventDefault();
      var id = $(this).data("id");
      console.log(id);
      var denialReason = $("#denialReason").val().trim();
      var newDenied = {
        denied: 1,
        deniedReason: denialReason
      };
  
        $.ajax({
          method: "PUT",
          url: "/update/kiosk/" + id,
          data: newDenied
        })
            .then(function (resp) {
                console.log(resp);
                window.setTimeout(function () {
                    window.location.assign("/kiosk")
                }, 200000)
            })
            .catch(function (err) {
                console.error(err);
            })
      });
});