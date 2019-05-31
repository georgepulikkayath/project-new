
$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email");
    var passwordInput = $("input#pswd");
    var fnameInput=$("input#fname");
    var lnameInput=$("input#lname");
    var lnoInput=$("input#lno");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
     
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        firstName:fnameInput.val().trim(),
        lastName:lnameInput.val().trim(),
        licenceNo:lnoInput.val().trim(),
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password,userData.firstName,userData.lastName,userData.licenceNo);
      emailInput.val("");
      passwordInput.val("");

    });
  
    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password,firstName,lastName,licenceNo) {
      $.post("/api/signup", {
        email: email,
        password: password,
        firstName:firstName,
        lastName:lastName,
        licenceNo:licenceNo

      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  