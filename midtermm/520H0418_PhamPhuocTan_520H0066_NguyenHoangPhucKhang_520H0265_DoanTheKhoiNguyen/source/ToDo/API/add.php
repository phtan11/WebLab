<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once('../todo.php');
$title = $_POST['title'];
if (empty($_POST['title'])) {
    $res = [];
    $res['code'] = 1;
    $res['message'] = 'data invalid';

    die(json_encode($res));
}
$result = add($title);
if ($result['id'] == 0) {
    $res = [];
    $res['code'] = 2;
    $res['message'] = "add fail";
    die(json_encode($res));
}
$res = array();
$res['code'] = 5;
$res['message'] = 'add success';
$res['data'] = $result;
die(json_encode($res));