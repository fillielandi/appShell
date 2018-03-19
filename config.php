<?php
		//These variables define the connection info for your MYSQL database
		$username="root"; // Mysql username 
		$password=""; // Mysql password 
		$host="localhost"; // Host name 
		$dbname="appshell"; // Database name 

		$options = array (PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
		try{
			$db = new PDO("mysql:host={$host}; dbname={$dbname};charset=utf8", $username, $password, $options);
		}

		catch(PDOException $ex){
			echo "0 Failed to connect to the database: " . $ex->getMessage();
		}

		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		//header('Conent-Type: text/html; charset=utf8');
		//session_start();

?>