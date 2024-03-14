<?php

if(isset($_POST["id"]) && !empty($_POST["id"])){
    $servername = "localhost";
    $dbname = "edicioProductes";
    $username = "root";
    $password = "";    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "DELETE FROM productes WHERE id=" . $_POST["id"];

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "error_message" => "Error al eliminar el producto: " . $conn->error));
    }

    $conn->close();
} else {
    echo json_encode(array("success" => false, "error_message" => "ID de producto no proporcionado"));
}
?>
