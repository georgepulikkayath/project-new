

var uvalue;
var total = 0;
var userDistance;
var userStatus;
var endDate;
var dest;
var d1;

// var moment = require('moment');
function fnStatus(thisObj) {
  
  var trid = thisObj.parentElement.children[0].value;

  var udistance = thisObj.parentElement.children[1].value;
  var newDistance = parseInt(udistance);

  console.log(newDistance);
  $.ajax({
    method: "PUT",
    url: "/api/tripstatus/" + trid
  }).then(function () {
    
  })
  total = total + newDistance;
  console.log("total dist" + total);
  $.get("/api/userDistance/" + uvalue).then(function (data) {


    d1 = data.distance;
   
    
    var d2 = d1 + total;
  
    $.ajax({
      method: "PUT",
      url: "/api/tripuserDistance/" + uvalue,

      data: {
        distance: d2
      }
    }).then(function () {
    
     
    })
  })
}


function fnRegister(thisObj) {
  debugger
  var trip_id = thisObj.parentElement.children[0].value;
  console.log(trip_id);
  console.log(uvalue);


  $.post("api/tripregister", {
    userId: uvalue,
    status: 0,
    tripDetailId: trip_id
  }).then(function (data) {
    console.log(data);
    alert("sucessfully registerd");
  })


}



$(document).ready(function () {


  var btn_trip = $("#btn");
  var link_user=$("#history");
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page


  $.get("/api/user_data").then(function (data) {
    debugger
    $(".member-name").text(data.email);
   

    //   localStorage.setItem('uid',data.id);
    // uvalue=localStorage.getItem(uid);

    sessionStorage.setItem("uid", data.id);
    uvalue = sessionStorage.getItem("uid");
    $.get("/api/userDistance/"+uvalue, function (data) {
      d1=data.distance
     $("#travelMiles").append(d1);

    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    //  document.write(today);


    $.get("/api/check/" + uvalue).then(function (data) {
      console.log(JSON.stringify(data, null, 4));


      for (i = 0; i < data.length; i++) {
        debugger
        var x = data[i];

        endDate = x.endDate;
        dest = x.destination;
        userStatus = x.trip_registers[0].status;
        tripId = x.trip_registers[0].id;
        console.log("userstatus" + userStatus);

        userDistance = x.distance;


        // var now = moment();
        // console.log("now"+now);
        var date1 = new Date(today);
        console.log("date1" + date1);


        var date2 = new Date(endDate);
        console.log("end" + date2);



        debugger
        if ((date1 > date2) && (userStatus == 0)) {
          var str = "";
          str += "<div>";
          str += "<input type=hidden value=" + tripId + ">";
          str += "<input type=hidden value=" + userDistance + ">";
          str += "<p>Did you go to " + dest + "\t?</p>";
          str += "<button onClick=fnStatus(this)>yes</button>";

          str += "<button id=btn-no>no</button>";
          str += "</div>"

        }
        console.log("it worked" + i);
        $("#pop").append(str);
      }


    })
  });
  

    
    
 

  btn_trip.on("click", function (event) {
     debugger
     event.preventDefault();

    $.get("/api/trips").then(function (trip) {

      console.log("All trips:", JSON.stringify(trip, null, 4));
      var str = "";
      for (i = 0; i < trip.length; i++) {
        str += "<div >";
        str += "<input type=hidden value=" + trip[i].id + ">";
        str += "<p>" + trip[i].destination + "</h1>";
        str += "<p>" + trip[i].startDate + "</p>";
        str += "<p>" + trip[i].endDate + "</p>";
        str += "<p>" + trip[i].distance + "</p>";
        str += "<p>" + trip[i].origin + "</p>";
        str += "<button onClick=fnRegister(this)>Register</button>";
        str += "</div>";


      }
      $("#tripPost").append(str);


    })
  });



 });


