var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
  app.get("/membersStyle", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/membersStyle");
    }
    res.sendFile(path.join(__dirname, "../views/membersStyle.html"));
  });
  
  app.get("/home", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/home.html"));
  });
//
app.get("/signup",function(req,res){
  res.sendFile(path.join(__dirname,"../views/signup.html"));
})
app.get("/history",function(req,res){
  res.sendFile(path.join(__dirname,"../views/history.html"));
})
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/members.html"));
  });
};