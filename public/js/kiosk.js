$(document).ready(function () {
    $("#approve").on("click", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax({
            method: "PUT",
            url: "/update/kiosk/" + id,
            data:{
                approved: true
              }
        })
            .then(function () {
                window.location.href = "/kiosk";
            }).catch(handleLoginErr);
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    });
});

