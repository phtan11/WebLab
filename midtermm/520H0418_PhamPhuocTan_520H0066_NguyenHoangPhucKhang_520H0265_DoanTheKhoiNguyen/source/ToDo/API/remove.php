<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once('../todo.php');
$raw = file_get_contents('php://input');
$data = json_decode($raw);


function error_reponse($code, $message)
{
    $res = array();
    $res['code'] = $code;
    $res['message'] = $message;

    die(json_encode($res));
}
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    error_reponse(4, 'protocol is not supported');
}
if ($data->id == null) {
    error_reponse(1, 'provide a input id of todo');
}
$id = $data->id;
$result = remove(($id));