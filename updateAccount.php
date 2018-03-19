<?php
    require("config.php");
    
    // echo $_SERVER['REQUEST_METHOD'];
	// print_r($_POST); exit();
	
	if(empty($_POST['username'])) die("Username required");
	if(empty($_POST['name'])) die("Name required");		
		
	$username = $_POST['username'];
	$name = $_POST['name'];
	$ID = $_POST['ID'];

    $query = "SELECT 1 FROM users WHERE username = :username and ID <> :ID";
    $query_params = array(':username' => $username, ':ID' => $ID);

    try { 
        $stmt = $db->prepare($query); 
        $result = $stmt->execute($query_params); 
    } catch(PDOException $ex){ 
       	echo "0 .Failed to run query: " . $ex->getMessage();
		logmsg("updateAccount.php : Failed to run query: " . $ex->getMessage());
       	exit();
    } 	
    
    $row = $stmt->fetch(); 
    
    if($row) { 
        //die("This username address is already registered"); 
        // setup reset password button and sent password via email
        echo "0 .This username is already registered"; // for failure
        exit();
    } 
		
	$sql = 'update users set 
					username = :username, 
					name = :name,						 
			where ID = :ID';	

	$query_params = array(
		':username' => $username, 
		':name' => $name, 
		':ID' => $ID); 	

	
	//print_r($query_params); exit();
	
	try {  
            $stmt = $db->prepare($sql); 
            $result = $stmt->execute($query_params); 
    } catch(PDOException $ex) { 
	        echo "0 .Failed to run query: " . $ex->getMessage(); 
			logmsg("updateAccount.php : Failed to run query: " . $ex->getMessage());
			exit();
    } 	
	//logmsg("inside updateAccount.php after insert");
    
    // at this point it should be a success
    $query = "SELECT ID, username, name FROM users WHERE username = :userName";
    $query_params = array(':userName' => $username);

    try { 
        $stmt = $db->prepare($query); 
        $result = $stmt->execute($query_params); 
		
		$outData = array();
		while($row = $stmt->fetch()) {
			$outData[] = $row;
		} 
		//echo json_encode($outData);
		echo '{"user":' . json_encode($outData) . '}'; 
		exit();
    } catch(PDOException $ex){ 
       	echo "0 .Failed to run query: " . $ex->getMessage();
       	exit();
    } 
?>


