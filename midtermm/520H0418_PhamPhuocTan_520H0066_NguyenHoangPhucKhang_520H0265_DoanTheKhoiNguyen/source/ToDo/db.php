<?php
function get_connection()
{
    $conn = new mysqli("localhost", "root", "", "todo");
    return $conn;
}