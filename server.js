var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var PORT = process.env.PORT || 8080;
var db = require("./models");
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
var syncOptions = { force: false };

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
db.sequelize.sync(syncOptions).then(function() {
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});