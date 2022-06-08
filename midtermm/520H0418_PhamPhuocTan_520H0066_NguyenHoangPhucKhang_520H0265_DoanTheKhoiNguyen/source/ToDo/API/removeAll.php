<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once('../todo.php');
$raw = file_get_contents('php://input');

$result = removeAll();