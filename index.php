<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AppShell</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/header.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/home.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/about.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/contact.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/signup.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/login.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/manage.html"); ?>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/shell/applicationShell/footer.html"); ?>

	<!--Script Links-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="appshell.js"></script>
    <script>
		$(document).ready(function() {
		    $('section').eq(0).show(); 
		    $('.navbar-nav').on('click', 'a', function() {
		        $($(this).attr('href')).show().siblings('section:visible').hide();
		    });
		});
    </script>
</body>
</html> 