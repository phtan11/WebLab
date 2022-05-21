<?php
require_once('database/product_db.php');
header('Content-type:application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    $data = array();
    $data['code'] = 2;
    $data['message'] = 'this method not supported:' . $_SERVER['REQUEST_METHOD'];
    http_response_code(405);
    die(json_encode($data));
}
$data = json_decode(file_get_contents('php://input'));
if (is_null($data)) {
    http_response_code(400);
    die(json_encode(array('code' => 3, 'message' => 'JSON is null')));
}
if (!property_exists($data, 'name') || !property_exists($data, 'price') || !property_exists($data, 'desc')) {
    http_response_code(400);
    die(json_encode(array('code' => 4, 'message' => 'Please provide name , price , description')));
}
if (empty($data->name) || empty($data->price) || empty($data->desc)) {
    http_response_code(400);
    die(json_encode(array('code' => 5, 'message' => 'Your name or price or desc is empty')));
}
if (empty($_GET['id'])) {
    http_response_code(400);
    die(json_encode(array('code' => 6, 'message' => 'Please provide product id ')));
}
$id = (int)$_GET['id'];
$id = intval($id);
if ($id < 1 || $id > 1000) {
    http_response_code(400);
    die(json_encode(array('code' => 8, 'message' => 'id is uot of range')));
}
$result = update_product($id, $data->name, $data->price, $data->desc);

if ($result) {
    die(json_encode(array('code' => 0, 'message' => 'Update product success')));
} else {
    die(json_encode(array('code' => 1, 'messsge' => 'Update product fail')));
}