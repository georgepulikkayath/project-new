var uvalue;
var total=0;
var userDistance;
var userStatus;
var startDate;

// var moment = require('moment');
function fnRegister(thisObj){
  debugger
  var trip_id=thisObj.parentElement.children[0].value;
  console.log(trip_id);
  console.log(uvalue);
  $.post("api/tripregister",{
    userId:uvalue,
    status:0,
    tripDetailId:trip_id
  }).then(function(data){
    console.log(data);
   alert("sucessfully registerd");
  })
  
  
}

$(document).ready(function() {
  
 var btn_trip=$("#btn");
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
     
    //   localStorage.setItem('uid',data.id);
      // uvalue=localStorage.getItem(uid);
    
      sessionStorage.setItem("uid", data.id);
     uvalue=sessionStorage.getItem("uid");
     
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     
     today = mm + '/' + dd + '/' + yyyy;
    //  document.write(today);
     console.log(today);

     $.get("/api/check/"+uvalue).then(function(data){
      console.log( JSON.stringify(data, null, 4));
      for(i=0;i<data.length;i++){

      var x=data[i];
       startDate=x.startDate;
      console.log(startDate);
       userStatus=x.trip_registers[i].status;
      console.log("userstatus"+userStatus);
     
      var userDistance=x.distance;
 
  
// var now = moment();
// console.log("now"+now);
var date1=new Date(today);
console.log("date1"+date1);
var date2=new Date(startDate);
console.log(date2);
if((date1>date2)&&(userStatus==0)){
 total=total+userDistance;
 }

     }
     console.log(total);
     if(total>=5000)
     {
       console.log("a");

     }
     if(total>=2000){
       console.log("b");
     }
     if(total<1000){
       console.log("c");
     }
  
    
     })
    
     
     
     
    });
  
   btn_trip.on("click",function(event){
     debugger
    event.preventDefault();

    $.get("/api/trips").then(function(trip){
      
      console.log("All trips:", JSON.stringify(trip, null, 4));
      var str="";
    for(i=0;i<trip.length;i++){
        str+="<div>";
         str+="<input type=hidden value="+trip[i].id+">";
        str+="<p>"+trip[i].destination+"</h1>";
        str+="<p>"+trip[i].startDate+"</p>";
        str+="<p>"+trip[i].duration+"</p>";
        str+="<p>"+trip[i].distance+"</p>";
        str+="<p>"+trip[i].origin+"</p>";
         str+="<button onClick=fnRegister(this)>Register</button>";
        str+="</div>";
     
        
      }
      $("#trips").append(str);
   
   
    })
  });
   
  
    
  });
 
