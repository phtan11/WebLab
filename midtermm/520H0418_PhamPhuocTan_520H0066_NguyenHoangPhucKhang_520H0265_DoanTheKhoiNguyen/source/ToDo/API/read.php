<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
require_once('../todo.php');

function success_reponse($data, $code, $message)
{
    $res = array();
    $res['code'] = $code;
    $res['message'] = $message;
    $res['data'] = $data;

    die(json_encode($res));
}

$data = read();

success_reponse($data, 3, 'read success todo');