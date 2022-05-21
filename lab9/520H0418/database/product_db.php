<?php
require_once('db.php');

function add_product($name, $price, $desc)
{
    $sql = "insert into product(name, price, description) values(?,?,?)";
    $conn = get_connection();

    // TODO: thực hiện prepare statement
    $stm = $conn->prepare($sql);
    // TODO: sau đó gọi bind_param() và execute()
    $stm->bind_param('sis', $name, $price, $desc);
    return $stm->execute();
}

function get_products()
{
    // TODO: viết chức năng đọc tất cả sản phẩm ở đây
    $sql = "select * from product";
    $conn = get_connection();
    $result = $conn->query($sql);
    if (!$result) return null;

    $products = array();

    for ($i = 0; $i < $result->num_rows; $i++) {
        $product = $result->fetch_assoc();
        $products[$i] = $product;
    }
    return $products;
}

function get_product($id)
{
    // TODO: viết chức năng đọc sản phẩm theo $id
}

function update_product($id, $name, $price, $desc)
{
    // TODO: viết chức năng cập nhật sản phẩm theo id
    $sql = "update product set name = ? , price = ? , description = ? where id = ?";
    $conn = get_connection();
    $stm = $conn->prepare($sql);
    $stm->bind_param('sisi', $name, $price, $desc, $id);
    $stm->execute();
    return ($stm->affected_rows === 1);
}

function delete_product($id)
{
    // TODO: viết chức xóa nhật sản phẩm theo id
}