<?php
    require("config.php");
    
    //echo $_SERVER['REQUEST_METHOD'];
    //print_r($_POST); exit();

    if(empty($_POST['username'])) die("Username or Email required"); 
    if(empty($_POST['password'])) die("Password required");

    //$rememberMe = $_POST['rememberMe'];
    //$loginToken = $_POST['loginToken'];
    $username = $_POST['username'];
    $email = $_POST['username'];
    $password = $_POST['password'];
    $hash = md5($password);

    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if(!filter_var($email, FILTER_VALIDATE_EMAIL) == false){
        $query = "SELECT username FROM users WHERE email = :email and password = :password";
        $query_params = array(':email' => $email, ':password' => $hash);
    }else{
        $query = "SELECT username FROM users WHERE username = :username and password = :password";
        $query_params = array(':username' => $username, ':password' => $hash);
    }



    try { 
        $stmt = $db->prepare($query); 
        $result = $stmt->execute($query_params); 
    } catch(PDOException $ex){ 
        http_response_code(500);
        echo json_encode(array(
            'error' => array(   
            'msg' => 'Error on login: ' . $ex->getMessage(),
            'code' => $ex->getCode(),
            ),
        ));
        exit();
    } 

    $row = $stmt->fetch(); 
    
    /*------- old code -------
    if($row) { // login success
        echo 1; // the client needs to expect this value for a successful login 
        exit();
    } else { // login failure
        echo -1;
        exit();
    }*/
    
    if($row) {
        $username = $row['username'];
        /*if($rememberMe == 'true'){
            //remove any entries older than 30 days
            $sql = 'delete from rememberme where tokendate < DATE_SUB(now(), INTERVAL 1 MONTH)';
            //query_params = array(':username' => $username);
            try{
                $stmt = $db->prepare($sql);
                $result = $stmt->execute();
            } catch (PDOException $ex){
                logmsg("login.php : failed to run delete query for rememberme token: " . $ex->getMessage());
            }
            $sql = 'INSERT into rememberme (token, username, tokenDate) VALUES 
            (:loginToken, :username, now())';

            $query_params = array(
                ':loginToken' => $loginToken,
                ':username' => $username);

            try{
                $stmt = $db->prepare($sql);
                $result = $stmt->execute($query_params);
            } catch (PDOException $ex){
                logmsg("login.php : failed to run delete query for rememberme token: " . 
                $ex->getMessage());
            }
        }*/
        // at this point it should be a success
            $query = 'SELECT ID, username, name, email FROM users WHERE username = :username';
            $query_params = array(':username' => $username);
            try{
                $stmt = $db->prepare($query);
                $result = $stmt->execute($query_params);

                $outData = array();
                while($row = $stmt->fetch()){
                    $outData[] = $row;
                }
                //echo json_encode($outData);
                echo '{"user":' . json_encode($outData) . '}';
                exit();
            } catch (PDOException $ex){
                http_response_code(500);
                echo json_encode(array(
                    'error' => array(   
                    'msg' => 'Error on select login ' . $ex->getMessage(),
                    'code' => $ex->getCode(),
                    ),
                ));
                exit();
            }
        
    } else { //failed login
                http_response_code(500);
                echo json_encode(array(
                    'error' => array(   
                    'msg' => 'Error failed login -1 ',
                    ),
                ));
                exit();
    }

?>
