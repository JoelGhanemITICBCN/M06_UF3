<?php
header('Content-Type: application/json');

$servername = "localhost";
$dbname = "fetchselects";
$username = "root";
$password = "";

try {
    $conexion = new mysqli($servername, $username, $password, $dbname);

    if ($conexion->connect_error) {
        echo json_encode(array('error' => 'Ha fallado la conexión: ' . $conexion->connect_error));
        exit();
    }

    $select = "SELECT * FROM categorias";
    $consulta = $conexion->query($select);

    if ($consulta === false) {
        echo json_encode(array('error' => 'Error en la consulta: ' . $conexion->error));
        exit();
    }

    $resultado = array();

    while ($categoria = $consulta->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $categoria["id"];
        $object->nombre = $categoria["nombre"]; 
        $resultado[] = $object;
    }

    echo json_encode($resultado);
    $conexion->close();
} catch (Exception $e) {
    echo json_encode(array('error' => 'Error en la ejecución: ' . $e->getMessage()));
}
?>
