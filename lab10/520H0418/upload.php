<?php
session_start();
if (empty($_POST['fileName'])) {
    $_SESSION['error'] = 'Please provide a valid file name';
    header('location: exercise1.php');
    die();
}
if (empty($_FILES['myFile'])) {
    $_SESSION['error'] = 'Please choose a file';
    header('location:exercise1.php');
    die();
}
$saveName = $_POST['fileName'];
$file = $_FILES['myFile'];
$name = $file['name'];
$tmp_name = $file['tmp_name'];
$type = $file['type'];
$error = $file['error'];
$size = $file['size'];
$ext = pathinfo($name, PATHINFO_EXTENSION);
$root = $_SERVER['DOCUMENT_ROOT'];

$suportted_file = array('txt', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'mp3', 'mp4', 'pdf', 'zip', 'raz');
if (!in_array($ext, $suportted_file)) {
    $_SESSION['error'] = 'this type of not suported by server';
    header('location:exercise1.php');
    die();
}
if ($size > 2 * 1024 * 1024 * 1024) {
    $_SESSION['error'] = 'this file is large';
    header('location:exercise1.php');
    die();
}
$final_path = "$root/Lab 10/uploads/$saveName";

if (move_uploaded_file($tmp_name, $final_path)) {
    $_SESSION['success'] = 'Upload file success';
    header('location:exercise1.php');
    die();
} else {
    $_SESSION['error'] = 'Can not save the upload file';
    header('location:exercise1.php');
    die();
}