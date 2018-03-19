//globals
var currentUser = null;

$(document).ready(function(){
	alert("Cookie:" + document.cookie);
	toggleLoginLogoffItems(false);

	$('#loginPageSignUpLink').on("click", function() {
        $("#signupNavItem").click();
    });

	//get the cookie for the token
	// if is exists then attmpt tp to auto login
	if(getCookie('loginToken')) {
		attempAutoLogin(getCookie('loginToken'));
	} else {
		toggleLoginLogoffItems(false);		
	}

	//----------------------------------------------------------------//
	$("#changePassword").on("show.bs.modal", function () {
		$("body").addClass("modal-open");		
		$("#changePasswordUsername").val($("#manageAccountUserName").val());
		
	});
	
	//----------------------------------------------------------------//
	$("#changePasswordButton").on("click", function() {
		
		// get values from the change pw modal
		// send to database		
		if( !$(this).hasClass("disabled")) { // not disabled 
			
			$.ajax({
				url: 'changepassword.php',
				type: 'POST',
				data:	{
							username: $("#changePasswordUsername").val(), 
							oldPassword: $("#changePasswordOldPassword").val(),
							newPassword: $("#changePasswordPassword").val(),
						},
				dataType: 'html',
				success:	function(data){
								if(parseInt(data) == 0){
									alert(data.split(".")[1]);							
								} else {
									alert(data);								
								}
								$("#changePasswordForm").trigger('reset');
								$("#changePasswordCloseButton").click();
							},
				error: 	function (xhr, ajaxOptions, thrownError) {
							alert("-ERROR:" + xhr.responseText + " - " + thrownError + " - Options" + ajaxOptions);
						}
			});    		
		}
	});

	//----------------------------------------------------------------//
	$("#signupNavItem").on("click", function() {
		$("#signupForm").trigger('reset');
	});

$('#signUpButton').on('click', function() {
    if($('#signUpPassword').val() != $('#signUpConfirmPassword').val()) {
        alert("passwords must match");
         // evt.preventDefault();
        return ;
    }

    $.ajax({
        url: 'signup.php',
        type: 'POST',
        data:	{
                    username:   $("#signUpUsername").val(), 
                    name:       $("#signUpName").val(),
                    email:      $("#signUpEmail").val(),
                    password:   $("#signUpPassword").val()
                },
        dataType: 'html',
        success:	function(data){

                        try {
                            data = JSON.parse(data);
                            alert("New user is signed up!");
                            currentUser = data.user; // set the currentUser to the global variable
                                $("#signUpUsername").val(""); 
                                $("#signUpName").val("");
                                $("#signUpEmail").val("");
                                $("#signUpPassword").val("");
                                $("#signUpConfirmPassword").val("");
                                $("#loggedInUserName").html("Hello " + $("#signUpName").val());
                                toggleLoginLogoffItems(true);
                            $("#homeNavItem").click();
                        } catch (ex) {
                            alert(ex);
                        }
                    },
        error: 	    function (xhr, ajaxOptions, thrownError) {
                        alert("-ERROR:" + xhr.responseText + " - " + 
                        thrownError + " - Options" + ajaxOptions);
                    }
    });    		
});

	//----------------------------------------------------------------//
	$("#manageAccountButton").on("click", function() {
		if( !$(this).hasClass("disabled")) { // not disabled 			

			$.ajax({
				url: 'updateAccount.php',
				type: 'POST',
				data:	{
							ID: $("#manageAccountID").val(), 
							username: $("#manageAccountUserName").val(), 
							firstname: $("#manageAccountName").val(),
						},
				dataType: 'html',
				success:	function(data){
								//alert(data);
								
								if(parseInt(data) != 0) { // error
									data = $.parseJSON(data);
									currentUser = data.user;
								 	alert("update successful");									
								 	$("#loggedInUserName").html("Hello " + data.user[0].username);
									
								} else { // success		
									alert(data.split(".")[1]);
									$("#manageAccountUserName").val(currentUser[0].username);
								} 
								
							},
				error: 	function (xhr, ajaxOptions, thrownError) {
							alert("-ERROR:" + xhr.responseText + " - " + thrownError + " - Options" + ajaxOptions);
						}
			});    		
		} // end if
	}); // end $("#manageAccountButton").on("click", function() {

	//----------------------------------------------------------------//
	$("#loginBtn").on("click", function() {
		var loginToken = "";

		if($("#rememberMeCheckBox").is(':checked'))
			loginToken = generateRandomToken(25); //randomstring of 25

		$.ajax({
			url: 'login.php',
			type: 'POST',
			data:	{
						rememberMe: $("#rememberMeCheckBox").is(':checked'),
						loginToken: loginToken,
						username: $("#loginUsername").val(), 
						email: $("#loginUsername").val(),
						password: $("#loginPassword").val()
					},
			dataType: 'html',
			success:	function(data){
							try {
								data = JSON.parse(data);
								//alert("Successfully Logged In");
								currentUser = data.user; // set the currentUser to the global variable
									$("#loginUsername").val(""); 
									$("#loginPassword").val("");
									$("#loggedInUserName").html("Hello " + data.user[0].username);
									toggleLoginLogoffItems(true);
								if($("#rememberMeCheckBox").is(':checked'))
							 		setCookie("loginToken", loginToken, 30);	
								$("#homeNavItem").click();
							} catch (ex) {
								alert(ex);
							}
						},
						error: 	    function (xhr, ajaxOptions, thrownError) {
							alert("-ERROR:" + xhr.responseText + " - " + 
							thrownError + " - Options" + ajaxOptions);
						}
		}); // end .ajax
	}); // end loginBtn onclick
	
	//----------------------------------------------------------------//
	$("#manageAccountNavItem").on("click", function() {
	
		var formData = new FormData();
		formData.append('userName',  currentUser[0].username);
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var resp = xmlhttp.responseText; // return values go here
					
				//alert("respone from getAccountInfo.php " + resp);
					
				if(parseInt(resp) != 0){ 
					resp = $.parseJSON(resp);
					currentUser = resp.user;
					//alert(resp);
					
					$("#manageAccountID").val(resp.user[0].ID);
					$("#manageAccountUserName").val(resp.user[0].username);
					$("#manageAccountName").val(resp.user[0].name);
					$("#manageAccountPassword").val("");
					$("#manageAccountConfirmPassword").val("");
						
				} else { // error
					alert(resp.split(".")[1]);
				}
			} //end if
		} // end  function

			xmlhttp.open("POST","getAccount.php", true); 
			xmlhttp.send(formData);
	});
		
	//----------------------------------------------------------------//
	$("#logoutNavItem").on("click", function() {
		toggleLoginLogoffItems(false);
		
	}); // end $("#logoutButton").on("click", function() {
		
	$("#loginPageSignUpLink").on("click", function() {
		$("#signupNavItem").click();
	});
}); //end documentready

function toggleLoginLogoffItems (login) {
	// pass in true if the user has logged in
	// otherwise pass in false
	//alert(document.cookie);
	if(login == true) {
		$(".loggedOn").show();
		$(".loggedOff").hide();
						
	} else { 
		$("#loggedInUserName").html(" ");
		$(".loggedOn").hide();
		$(".loggedOff").show();
		$("#homeNavItem").click();		
	}
}

function getCookie(cName){
	if(document.cookie){
		var cookie = document.cookie.split("; ");
		for (var i = 0; i < cookie.length; i++){
			if(cookie[i].split("=")[0] == cName){
				return unescape(cookie[i].split("=")[1]);
			}
		}
	}
}

function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires="expires=" + d.toGMTString();
	//alert(cname + " " + cvalue + " " + expires);
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function generateRandomToken(n) {
	var text = "";
	var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	var dayte = new Date();
	var dateInMilliseconds = dayte.getTime();

	for (var i=0; i<n; i++) 
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return dateInMilliseconds + text;
}

function attempAutoLogin(token){
	//alert ("attemptAutoLogin token " + token);
	var formData = new FormData();
	formData.append("loginToken", token);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var resp = xmlhttp.responseText; // return values go here

			//alert("response from validateLoginToken.php " + resp);
			if (parseInt(resp) <= 0){ //error
				//alert("successful auto login");
			}else{
				resp = $.parseJSON(resp);
				currentUser = resp.user;
				toggleLoginLogoffItems(true);
				$("#loggedInUserName").html("Hello " + currentUser[0].username);
				//setCookie("username", $("manageAccountUsername").val());
			}
		} //end if
	} // end function (onreadystatechange)
	xmlhttp.open("POST", "validateToken.php", true);
	xmlhttp.send(formData);
} // end function