<?php

require_once('db.php');
function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
function login($username, $password)
{
    $conn = create_connection();
    $sql = "select * from account where username = ?";

    $stm = $conn->prepare($sql);

    $stm->bind_param('s', $username);
    if (!$stm->execute()) {
        return 'can not login ,please contact your admin';
    }
    $result = $stm->get_result();
    if ($result->num_rows !== 1) {
        return 'can not login , invalid username';
    }
    $data =  $result->fetch_assoc();
    $hased = $data['password'];
    if (!password_verify($password, $hased)) return 'can not login , invalid password';
    $activated = $data['activated'];
    if ($activated === 0) return 'can not login , this account has not been activated';

    return true;
}
function register($username, $firstname, $lastname, $email, $password)
{
    $sql = "select count(*) from account where username = ? or email = ?";
    $conn = create_connection();
    $stm = $conn->prepare($sql);
    $stm->bind_param('ss', $username, $email);
    $stm->execute();

    $result = $stm->get_result();
    $exists = $result->fetch_array()[0] === 1;
    if ($exists) {
        return "can not register because username or email is elready exists";
    }
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $token = generateRandomString();
    $sql = "INSERT INTO account VALUES(?,?,?,?,?,0,'$token')";
    $stm = $conn->prepare($sql);
    $stm->bind_param('sssss', $username, $firstname, $lastname, $email, $hashed);
    if ($stm->execute()) return true;
    return $stm->error;
}
register('maivanmanh', 'mai', 'van manh', 'maivanmanh@gmai.com', '123456789');