<?php 
header("Access-Control-Allow-Origin: *");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$response = [
    'email' => 'igormenezes@yahoo.com.br', 
    'password' => '112312321', 
    'type' => 1
];
exit (json_encode($response));

