console.log("Logic js is reading");
$("#login").on("click", function (e) {
    e.preventDefault();
    var email = $("#email-input").val();
    var password = $("#password-input").val();
    console.log(email, password);
    axios.post("/api/login", {
        email: email,
        password: password
    })
        .then(function (resp) {
            console.log("resp: ", resp);
            window.localStorage.setItem("token", resp.data.token);
            document.cookie = "token=" + resp.data.token;
            $(".login").hide();
            $(".redirect").show();
            axios.get("/api/user_data")
                .then(function(resp){
                    console.log("axios get user data: ", resp);
                    if (resp.data.email == "kiosk@gmail.com") {
                        console.log(resp.data.email);
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
        console.log("signup logic reading");

});
