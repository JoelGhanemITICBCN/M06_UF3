<?php

$servername = "localhost";
$dbname = "edicioProductes";
$username = "root";
$password = "";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("No ha ido la conexion: " . $conn->connect_error);
    }
    if(isset($_POST["nomProducte"]) && !empty($_POST["nomProducte"])){
        if($_POST["addEdit"]==0){
            $sql = "INSERT INTO productes (nom) VALUES ('" . $_POST["nomProducte"] ."')";
        }else{
            $sql = "UPDATE productes SET nom='" . $_POST["nomProducte"] . "' WHERE id=" . $_POST["addEdit"];
        }
        echo $sql;
        if ($conn->query($sql) === TRUE) { echo "New record created successfully";
        } else { echo "Error: " . $sql . "<br>" . $conn->error; }
        $conn->close();
    }
    header('Location: ex1list.php');
?>