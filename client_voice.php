<?php
require_once 'vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;
 
$To= (isset($_POST['To']) && $_POST['To'] != '') ? trim($_POST['To']) : '';
$response = new VoiceResponse();
$dial = $response->dial('', ['callerId' => '+17244096436']);
$dial->client($To);
echo $response;