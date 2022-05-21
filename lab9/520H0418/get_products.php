<?php
require_once('database/product_db.php');

header('Content-type:application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    $data = array();
    $data['code'] = 2;
    $data['message'] = 'this method not supported:' . $_SERVER['REQUEST_METHOD'];
    http_response_code(405);
    die(json_encode($data));
}
$result = get_products();

if ($result == null) {
    die(json_encode(array('code' => 1, 'message' => 'can not read product')));
} else {
    die(json_encode(array('code' => 0, 'data' => $result, 'messsge' => 'read product success')));
}