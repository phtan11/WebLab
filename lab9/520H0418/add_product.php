<?php
require_once('database/product_db.php');
header('Content-type:application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
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
$result = add_product($data->name, $data->price, $data->desc);

if ($result) {
    die(json_encode(array('code' => 0, 'message' => 'Addd product success')));
} else {
    die(json_encode(array('code' => 1, 'messsge' => 'Add product fail')));
}