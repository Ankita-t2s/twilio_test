<?php
require_once 'twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;
$ERROR = 0;
$response = new VoiceResponse();
$response->hangup();

echo $response;

$ERROR = 1;

if ($ERROR == '1') {
	echo json_encode(array(
		'status' => 'success',
		'message'=> $response
		
	));
}
else
{
	echo json_encode(array(
		'status' => 'error',
		'message'=> $response
		

	));
}