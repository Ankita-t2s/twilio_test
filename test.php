<?php 

$client = 'muzzamil';
$workerSid =[];

$workerSid_array=array('ankita'=>' WKd9a0646354daf6f3a1473a01fd294205',
            'muzzamil'=>'WK52eff0720cc5a7715dcbcc84ef61fcb9',
            'akilash'=>'WKb65064451085949d85212dbe17cf0c22');
foreach ($workerSid_array as $key => $value) {
	    if($client==$key){
	    $workerSid= $workerSid_array[$key];	
	    }
		//echo $key;
	
}
echo $workerSid;
 ?>