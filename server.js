// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var db = require("./models");
// var authRoutes = require("./routes/auth.routes");
// var apiRoutes = require("./routes/api.routes");
// var htmlRoutes = require("./routes/html.routes");
var cookieParser = require("cookie-parser")
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use("/auth", authRoutes);
// app.use(auth);
// app.use("/api", apiRoutes);
// app.use(htmlRoutes);


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('layouts/404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});