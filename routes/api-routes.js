var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      licenceNo: req.body.licenceNo
    }).then(function () {

      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,

        id: req.user.id
      });
    }
  });
  app.get("/api/trips", function (req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      db.trip_details.findAll().then(function (data) {

        res.json(data);
      });
    }
  });
  app.get("/api/check/:uvalue", function (req, res) {

    var uid = req.params.uvalue;
    console.log(uid);
    db.trip_details.findAll({
      include: [{
        model: db.trip_register,
        where: [
          { userId: req.params.uvalue },
          { status: 0 }
        ]
      }]
    }).then(function (data) {
      /* ... */

      console.log("it worked");
      res.json(data);
      console.log(":", JSON.stringify(data, null, 4));
    });
  });
  app.put("/api/tripstatus/:trid", function (req, res) {
    id = req.params.trid;
    console.log(id);
    db.trip_register.update({
      status: 1
    },
      {
        where:

          { id: req.params.trid }
      }

    ).then(function () {
      console.log("sucess");
    })
  })
  app.put("/api/tripuserDistance/:uvalue",function(req,res){
   
    db.User.update(
      req.body,
      {
        where:{
         id:req.params.uvalue
        }
      }
  )});
  app.get("/api/userDistance/:uvalue", function (req, res) {
    console.log("LOOK HERE CADIN")
    console.log(req.user.distance);
    db.User.findOne({
        where:
        {
          id: req.params.uvalue
        }
    }).then(function(data){
      res.json(data);
      console.log(JSON.stringify(data,null,4));
      
    })
  })
  

  app.post("/api/tripregister", function (req, res) {
    console.log(req.body);
    db.trip_register.create({
      userId: req.body.userId,
      status: req.body.status,
      tripDetailId: req.body.tripDetailId

    }).then(function () {
      console.log("sucess");
    })
  })
};

// var db = require("../models");
// var passport = require("../config/passport");
// //
// module.exports = function(app) {
//   // Using the passport.authenticate middleware with our local strategy.
//   // If the user has valid login credentials, send them to the members page.
//   // Otherwise the user will be sent an error
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//     // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//     // So we're sending the user back the route to the members page because the redirect will happen on the front end
//     // They won't get this or even be able to access this page if they aren't authed
//     res.json("/members");
//   });
// //
//   // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
//   // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
//   // otherwise send back an error
//   app.post("/api/signup", function(req, res) {
//     console.log(req.body);
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       licenceNo:req.body.licenceNo
//     }).then(function() {
    
//       res.redirect(307, "/api/login");
//     }).catch(function(err) {
//       console.log(err);
//       res.json(err);
//       // res.status(422).json(err.errors[0].message);
//     });
//   });
// //
//   // Route for logging user out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });
// //
//   // Route for getting some data about our user to be used client side
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       // The user is not logged in, send back an empty object
//       res.json({});
//     }
//     else {
//       // Otherwise send back the user's email and id
//       // Sending back a password, even a hashed password, isn't a good idea
//       res.json({
//         email: req.user.email,
        
//         id: req.user.id
//       });
//     }
//   });
//   app.get("/api/trips",function(req,res){
//     if(!req.user){
//       res.json({});
//     }
//    else{
//     db.trip_details.findAll().then(function(data) {
      
//     res.json(data);
//     });
//    }
//   });
//   app.get("/api/check/:uvalue",function(req,res){
    
//    var uid=req.params.uvalue;
//    console.log(uid);
//   db.trip_details.findAll({
//     include: [{
//       model: db.trip_register,
//       where: [
//         {userId:req.params.uvalue},
//         {status:0}
//       ]
//      }]
//   }).then(function(data) {
//     /* ... */
    
//     console.log("it worked");
//     res.json(data);
//     console.log(":", JSON.stringify(data, null, 4));
//   });
// });

// app.post("/api/tripregister",function(req,res){
//   console.log(req.body);
//   db.trip_register.create({
//     userId:req.body.userId,
//     status:req.body.status,
//     tripDetailId:req.body.tripDetailId

//   }).then(function(){
//     console.log("sucess");
//   })
// })
// };
