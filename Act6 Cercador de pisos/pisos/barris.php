<?php
$name = "m6"; 
$user = "root";
$pwd = "";
$serverDB = "localhost"; 

$conn = mysqli_connect($serverDB, $user, $pwd, $name);

if (mysqli_ping($conn)) {
    $id = $_POST["id"];
    $sql = "SELECT * FROM barris WHERE id_districte = $id";

    $query = mysqli_query($conn, $sql);

    $object = new stdClass();

    $return = array();
    while ($row = $query->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["name"];
    
        array_push($return, $object);
    }
    
    echo json_encode($return);

    mysqli_close($conn);
}