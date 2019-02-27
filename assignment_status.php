
<?php

// Update the path below to your autoload.php,// Update the
// see https://getcomposer.org/doc/01-basic-usage.md
require_once 'vendor/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
$sid    = "AC9534c140fe1f22a147cfa4308baacb97";
$token  = "d1719541146648899e20e0aa2f680c1c";
$twilio = new Client($sid, $token);
$taskSid=$_REQUEST['taskSid'];

$task = $twilio->taskrouter->v1->workspaces("WS98700f49cc7363d67f389b6f57e8c7bd")
                               ->tasks($taskSid)
                               ->update(array(
                                            "assignmentStatus" => "completed",
                                            "reason" => "Resolved query"
                                        )
                               );

print($task->taskQueueFriendlyName);
?>