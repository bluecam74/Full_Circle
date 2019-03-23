$(document).ready(function() {
$("#sub-req").on("click", function (e) {
    e.preventDefault();
    var amount = $("#amountReq").val().trim();
    var voucherNum = $("#voucherNum").val().trim();

    var pendingData = {
        amount: amount,
        voucherNum: voucherNum
    }
    if (!pendingData.amount || !pendingData.voucherNum) {
        return;
      }

      pendingPost(pendingData.amount, pendingData.voucherNum);
    amount.val("");
    voucherNum.val("");
  });
        

function pendingPost(amount, voucherNum) {
    $.post("/api/transactions", {
        amount: amount,
        voucherNum: voucherNum, 
        UserId: UserId
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

