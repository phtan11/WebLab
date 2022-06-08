<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
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
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    error_reponse(4, 'protocol is not supported');
}
if (empty($data->title)) {
    error_reponse(1, "provide a input of todo");
}
$id = $data->id;
$title = $data->title;

$result = update($id, $title);
if (!$result) {
    error_reponse(0, 'update is not success');
}