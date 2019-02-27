<?php
require_once 'vendor/autoload.php';
//header('Content-Type: application/json');

use Twilio\Jwt\ClientToken;
use Twilio\Jwt\TaskRouter\WorkerCapability;
// put your Twilio API credentials here
$client = $_REQUEST['client'];
$accountSid = 'AC9534c140fe1f22a147cfa4308baacb97';
$authToken  = 'd1719541146648899e20e0aa2f680c1c';
$appSid = 'AP8f3008065cd8f82bf59bd3895b33f901';
$workspaceSid = 'WS98700f49cc7363d67f389b6f57e8c7bd';
$workerSid_array=[];
// $workerSid ='WKd9a0646354daf6f3a1473a01fd294205';
// echo '</br>';

$workerSid_array = include 'test_array.php';
// var_dump($workerSid_array);die;
// echo $workspaceSid."<br>";

$workerSid= $workerSid_array[$client];
// die;
//capability token for device
$capability = new ClientToken($accountSid, $authToken);
$capability->allowClientOutgoing($appSid);
$capability->allowClientIncoming($client);
$token = $capability->generateToken(28800);




//capability token for task_router
$capability_router = new WorkerCapability($accountSid, $authToken, $workspaceSid, $workerSid);
$capability_router->allowFetchSubresources();
$capability_router->allowActivityUpdates();
$capability_router->allowReservationUpdates();
$token_router = $capability_router->generateToken();
// // By default, token_routers are good for one hour.
// // Override this default timeout by specifiying a new value (in seconds).
// // For example, to generate a token_router good for 8 hours:
$token_router = $capability_router->generateToken(28800);

echo json_encode(array(
	'client' => $client, 
	'token' => $token,
	'token_router' => $token_router
));