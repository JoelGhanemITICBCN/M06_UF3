<?php
$name = "m6";
$user = "root";
$pwd = "";
$serverDB = "localhost";

$conn = mysqli_connect($serverDB, $user, $pwd, $name);

if (mysqli_ping($conn)) {
    if (isset($_POST["nom"]) && isset($_POST["cognoms"]) && isset($_POST["DNI"]) && isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["tlf"])) {
        $nom = $_POST["nom"];
        $cognoms = $_POST["cognoms"];
        $dni = $_POST["DNI"];
        $username = $_POST["username"];
        $email = $_POST["email"];
        $tlf = $_POST["tlf"];

        $sql = "SELECT * FROM usuaris WHERE email = '$email'";
        $resultado = mysqli_query($conn, $sql);
        //Compruebo que el mail esta registrado
        if (mysqli_num_rows($resultado) > 0) {
            $response = "email_registrado";
        } else {
            //en caso de que no lo este compruebo el dni
            $sql = "SELECT * FROM usuaris WHERE dni = '$dni'";
            $resultado = mysqli_query($conn, $sql);
            if (mysqli_num_rows($resultado) > 0) {
                $response = "dni_registrado";
            } else {
                $sql = "INSERT INTO usuaris (nom, cognoms, dni, username, email, telefon)
                VALUES ('$nom', '$cognoms', '$dni', '$username', '$email', '$tlf')";

                $query = mysqli_query($conn, $sql);
                if ($query) {
                    $response = "insertado";
                } else {
                    $response = "Error al insertar l'usuari";
                }
            }
        }
    } else {
        $response = "Se requieren campos que no se han rellenado";
    }
    echo $response;
    mysqli_close($conn);
}
