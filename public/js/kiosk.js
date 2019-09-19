$(document).ready(function() {
  

  
  $(".approve").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(this).data("id");
 
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
      $.get("/update/points/" + user).then(function(data) {
      var points = data.points;
      var newTotal = points + newPoints;
      var newData = {
        points: newTotal
      }
      $.ajax({
        method: "PUT",
        url: "/update/points/" + user,
        data: newData
      })
          .then(function (resp) {
             $.get("/update/points/" + user).then(function(data) {
              var points = data.points;
          })
        })
          .catch(function (err) {
              console.error(err);
          })
    });
  }


 function getNewPoints(id) {
    $.get("/api/transactions/" + id, function(data) {
      var amount = data.amount;
      var user = Number(data.userId);
      var newPoints = Math.round(amount*10);
      getTotalPoints(newPoints, user);
    });
  }
  

    $(".deny").on("click", function (e) {
      e.preventDefault();
      var id = $(this).data("id");
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
                window.setTimeout(function () {
                    window.location.assign("/kiosk")
                }, 200)
            })
            .catch(function (err) {
                console.error(err);
            })
      });
});