$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#create-email");
  var passwordInput = $("input#create-password");
  var fnameInput = $("input#create-fname");
  var lnameInput = $("input#create-lname");
  var zipInput = $("input#create-zip");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#create-submit").on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim(),
      zip: zipInput.val().trim(),

    };

    console.log(userData);

    if (!userData.email || !userData.password || !userData.fname || !userData.lname) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.fname, userData.lname, userData.zip);
    console.log(userData.id);
    createPoints(userData.email, userData.fname, userData.lname, userData.zip);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, fname, lname, zip) {
    $.post("/api/signup", {
      email: email,
      password: password,
      fname: fname,
      lname: lname,
      zip: zip
    }).then(function (data) {
      window.location.replace(data);
      
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
    window.location.assign("/index");
  }
  function createPoints(email, fname, lname, zip) {
    $.get("/api/user_data").then(function (data) {
      console.log(data);
      var id = data.id;
      console.log("create points ",id);
      axios.post("/points/create", {
        userId: id,
        email: email,
        fname: fname,
        lname: lname,
        zip: zip
      }).then(function (data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
      window.setTimeout(function () {
        window.location.assign("/index")
    }, 200000)
    })
}


  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
