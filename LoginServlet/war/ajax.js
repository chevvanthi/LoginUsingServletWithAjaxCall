$(document).ready(function(){
	
	$('#loginDiv').show();
	$('#signupDiv').hide();
	$('#changepasswordDiv').hide();
	$('#signin').show();
	$('#logout').hide();
	$('#ToDoListDiv').hide();
   
function loginshow(){
	
	$('#loginDiv').show();
	$('#signupDiv').hide();
	$('#changepasswordDiv').hide();
	$('#signin').show();	
	$('#logout').hide();
	$('#ToDoListDiv').hide();

	document.getElementById("print").innerHTML = "";
}

function signupshow(){
	
	$('#loginDiv').hide();
	$('#signupDiv').show();
	$('#changepasswordDiv').hide();
	$('#signin').hide();
	$('#logout').hide();
	$('#ToDoListDiv').hide();

	document.getElementById("print").innerHTML = "";
	
}

function changepassShow(){
	
	$('#loginDiv').hide();
	$('#signupDiv').hide();
	$('#changepasswordDiv').show();
	$('#signin').hide();
	$('#logout').hide();
	$('#ToDoListDiv').hide();

	document.getElementById("print").innerHTML = "";
}

function hideAll(){
	
	$('#loginDiv').hide();
	$('#signupDiv').hide();
	$('#changepasswordDiv').hide();
	$('#signin').hide();
	$('#logout').show();
	$('#ToDoListDiv').hide();

	document.getElementById("loginuseremail").value = "";
	document.getElementById("loginuserpass").value = "";
	document.getElementById("failureMessage").innerHTML = " ";
	document.getElementById("failureText").innerHTML = " ";
	document.getElementById("signupuseremail").value = " ";
	document.getElementById("signupuserpassword").value = " ";
	document.getElementById('changepassemail').value = "";
	document.getElementById('changepass').value =" ";
	document.getElementById('failureMessageSignUp').value = " ";

	
};

$('#signuppage').click(function(){
	
	signupshow();
});


$('#loginpage').click(function(){
	document.getElementById("loginuseremail").value = "";
	document.getElementById("loginuserpass").value = "";
	loginshow();
});

$('#loginBack').click(function(){
	document.getElementById("loginuseremail").value = "";
	document.getElementById("loginuserpass").value = "";
	loginshow();
});
$('#ResetPage').click(function(){
	document.getElementById("changepassemail").value = "";
	document.getElementById("changepass").value = "";
	document.getElementById("failureText").innerHTML = "";

	changepassShow();
});

$('#logout').click(function(){
	document.getElementById("loginuseremail").value = "";
	document.getElementById("loginuserpass").value = "";
	loginshow();
});

function validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}


$('#loginbutton').click(function(){
	
	var emailVal    =  $('#loginuseremail').val();
	var password    =  $('#loginuserpass').val();	
	var email       =  $.trim(emailVal);
	
	if(!(validateEmail(email))){
		
		 alert("Please enter the valid email address")
		 $('#loginuseremail').focus();
	}
	else if(email == '' || password == ""){
	 
		alert("please enter all the details");
	
	}else if(password.lenght < 6){
		
		alert("password length should be more than 6 char")
	}else{
		
		$.ajax({

			type :   "GET",
			url  : ' /loginservlet',
			dataType : "json",
			data     : {
				
				loginUserEmail : $('#loginuseremail').val(),
				loginUserPass  : $('#loginuserpass').val()
			      },
			success : function(results){
				console.log("success" + JSON.stringify(results));
				
				if(results.status == "ValidCredentials"){
				
					hideAll();
					document.getElementById("print").innerHTML = "LoggedIn successfully";
					
					
				}else if(results.status == "InvalidCredentials"){
					
					document.getElementById("failureMessage").innerHTML = "Password is incorrect ";
					document.getElementById("loginuserpass").value = "";
					
				} else if(results.status == "EmailIdDoesNotExit"){
					
					document.getElementById("failureMessage").innerHTML = "Please enter valid login credentials ";
					document.getElementById("loginuseremail").value = "";
					document.getElementById("loginuserpass").value = "";
					$('#loginuseremail').focus();
				}
				
			},
			      
			error : function (results){
				console.log("error " + JSON.stringify(results))
			}      
			
		
	});

	}
});
	
$('#signupbutton').click(function(){

	
	var emailVal    =  $('#signupuseremail').val();
	var password    =  $('#signupuserpassword').val(); 
	var email       =  $.trim(emailVal);

	if(!(validateEmail(email))){
		
		alert("Please enter the valid email address")
		$('#loginuseremail').focus();
	}
	else if(email == '' || password == ""){
		alert ("please enter all the details ");
	}else if(password.length < 6){
		alert("password should be 6 char long");
	}else{
		
		$.ajax({
			
			type : "POST",
			url  :' /loginservlet',
			dataType : 'json',
			data  : {
				
				signUpuserEmail : $('#signupuseremail').val(),
				signUpuserPass  :$('#signupuserpassword').val()
			},
			success : function(results){
				console.log("success " + JSON.stringify(results));
				
				if(results.status == "AlreadyRegistered"){				
					
					document.getElementById("failureMessageSignUp").innerHTML = "Email address alredy exits";
					document.getElementById("signupuseremail").value = " ";
					document.getElementById("signupuserpassword").value = '';
					
				}else if(results.status == "NewlyRegistered"){
					
					hideAll();
					document.getElementById("print").innerHTML = "registerd Succesfully";
					
					
					
					
					
					

					
					
					
						
					
					
				}
			},
			error : function(results){
				console.log("error " + JSON.stringify(results));
			}
			
			
		})
				
	}	

});

	
$('#chanhepassbutton').click(function(){

	var emailVal     = $('#changepassemail').val();
	var password     = $('#changepass').val(); 
	var email        = $.trim(emailVal);

	if(!(validateEmail(email))){
		
		alert("Please enter the valid email address")
		$('#changepassemail').focus();
	}
	else if(email == '' || password == ""){
		alert ("please enter all the details ");
	}else if(password.length < 6){
		alert("password should be 6 char long");
	}else{
		
		$.ajax({
			
			type : "PUT",
			url  : '/loginservlet',
			dataType : 'json',
			data  : {
				
				changeUserEmail : $('#changepassemail').val(),
				changeUserPass  :$('#changepass').val()
			},
			success : function(results){
				console.log("success " + JSON.stringify(results));
				
				if(results.status == 'NoEmailId'){
					document.getElementById("failureText").innerHTML = "Please enter valid Email address";
					document.getElementById('changepassemail').value = "";
					$('#changepassemail').focus();
				}else if(results.status == 'passwordChanged'){
					document.getElementById("print").innerHTML = "Password changed succesfully";
					hideAll();

				}
				
			},
			error : function(results){
				console.log("error " + JSON.stringify(results));
				
			}
			
			
		})
		
	}
	

});

$('#createListId').keyup(function(e){
	
	if(e.keyCode == 13){
		
   
		
	}
})


	
});

