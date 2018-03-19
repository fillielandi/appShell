<?php
	function logmsg($msg) {
			
			date_default_timezone_set('America/New_York');
			$dayte = date("Y-m-d h:i:sa");
			$fileDayte = date("Y-m-d");
			
			$logmsg = $dayte . " -- " . $msg . "\r\n";

			file_put_contents('log/ApplicationShellLog_' . $fileDayte . '.txt', $logmsg, FILE_APPEND | LOCK_EX);
			
	}
?>