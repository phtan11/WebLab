<?php
require_once('db.php');

function add($title)
{
    $sql = 'INSERT INTO listtodo(title) VALUES(?)';
    $conn = get_connection();
    $stm =  $conn->prepare($sql);
    $stm->bind_param('s', $title);
    $stm->execute();

    if ($stm->affected_rows == 1) {
        $result = array();
        $result['id'] = $stm->insert_id;
        $result['title'] = $title;
        return $result;
    }
    return 0;
}
function read()
{
    $sql = 'SELECT * FROM listtodo';
    $conn = get_connection();
    $result = $conn->query($sql);

    $output = array();

    while (($row = $result->fetch_assoc())) {
        $output[] = $row;
    }
    return $output;
}
function remove($id)
{
    $sql = 'DELETE FROM listtodo WHERE id = ?';
    $conn = get_connection();
    $stm =  $conn->prepare($sql);
    $stm->bind_param('i', $id);
    $stm->execute();


    return $stm->affected_rows == 1;
}
function update($id, $title)
{
    $sql = 'UPDATE listtodo SET title = ? WHERE id = ?';

    $conn = get_connection();
    $stm = $conn->prepare($sql);
    $stm->bind_param('si', $title, $id);

    $stm->execute();

    return $stm->affected_rows === 1;
}

function removeAll(){
    $sql = 'DELETE FROM listtodo';
    $conn = get_connection();
    $result = $conn->query($sql);
    return $result;
}