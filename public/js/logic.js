$("#login").on("click", function (e) {
    e.preventDefault();
    var email = $("#email-input").val();
    var password = $("#password-input").val();
    axios.post("/api/login", {
        email: email,
        password: password
    })
        .then(function (resp) {
            window.localStorage.setItem("token", resp.data.token);
            document.cookie = "token=" + resp.data.token;
            $(".login").hide();
            $(".redirect").show();
            axios.get("/api/user_data")
                .then(function(resp){
                    if (resp.data.email == "kiosk@gmail.com") {
                        window.setTimeout(function () {
                            window.location.assign("/kiosk")
                        }, 200)
                    }
                    else
                    window.setTimeout(function () {
                        window.location.assign("/dashboard")
                    }, 200)
                });
           
        })
        .catch(function (err) {
            console.error(err);
        })
})

$("#signup").on("click", function (e) {
    e.preventDefault();
        window.location.assign("/create_account")

});
