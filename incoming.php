<?php
require_once 'vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;
 

$response = new VoiceResponse();
$gather = $response->gather(['action' => 'process_gather.php',
    'method' => 'GET']);
$gather->say('Please press 1 to call Ankita. Press 2 to call Muzammil. Press 3 to call Akhilesh');
$response->say('We didn\'t receive any input. Goodbye!');
echo $response;

//For incoming calls.
// $dial = $response->dial('', ['callerId' => '+17244096436']);
// $dial->client("ankita");
 // echo $response;
//For IVR


?>