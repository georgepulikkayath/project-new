var uvalue;
$(document).ready(function(){
    debugger
   
    uvalue = sessionStorage.getItem("uid");

    $.get("/api/history/" + uvalue).then(function (data){
        
        console.log("tripdetails"+JSON.stringify(data,null,4));
        var str="";
  
          for(i=0;i<data.length;i++){
              
            str+="<div>";
            str+="<p>Destination:"+data[i].destination+"</p>";
            str+="<p>Start Date:"+data[i].startDate+"</p>";
            str+="<p>End Date:"+data[i].endDate+"</p>";
            str+="</div>"
            str+="<hr>"
          }
          $("#div-booked").append(str);
      });
})