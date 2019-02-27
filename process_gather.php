<?php
require_once 'vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;
$agentResponse = $_REQUEST["Digits"];


$response = new VoiceResponse();
$dial = $response->dial('', ['callerId' => '+17244096436']);

if($agentResponse=='1'){
	$dial->client("ankita");

}else if($agentResponse=='2'){
	$dial->client("muzammil");

}else{
	$dial->client("akilash");
}

echo $response;
?>