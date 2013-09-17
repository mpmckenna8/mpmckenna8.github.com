$(function() {
  $( "#datepicker" ).datepicker();
  });

var email = document.getElementById("mail");
email.addEventListener("onkeyup", function(event){
                       if(email.validity.valid) {
                       email.setCustomValidity("Please enter a valid e-mail address.");
                       
                       }
                       else{
                       email.setCustomValidity("");
                       }
                       });

/* also need to do stuff from http://jquery.bassistance.de/validate/demo/