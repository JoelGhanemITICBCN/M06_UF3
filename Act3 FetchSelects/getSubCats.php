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

    $categoriaBD = isset($_POST["cat"]) ? $_POST["cat"] : '';

    $select = "SELECT * FROM subcategorias WHERE id_categoria = ?";
    $stmt = $conexion->prepare($select);

    if (!$stmt) {
        echo json_encode(array('error' => 'Error en la preparación de la consulta: ' . $conexion->error));
        exit();
    }

    $stmt->bind_param('i', $categoriaBD);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $resultado = array();

    while ($subcategoria = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $subcategoria["id"];
        $object->nombre = $subcategoria["nombre"];
        $resultado[] = $object;
    }

    echo json_encode($resultado);
    $conexion->close();
} catch (Exception $e) {
    echo json_encode(array('error' => 'Error en la ejecución: ' . $e->getMessage()));
}
?>
