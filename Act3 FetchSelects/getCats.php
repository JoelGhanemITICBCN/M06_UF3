
<?php
$servername = "localhost";
$dbname = "fetchselects";
$username = "root";
$password = "";
$conexion = mysqli_connect($servername, $username, $password, $dbname);
if ($conexion->connect_error) {
    die("Ha fallado la conexion" + $conexion->connect_error);
}
    $select = "select * from categorias";
    $consulta = mysqli_query($conexion, $select);
    $object = new stdClass();
    $resultado = array();
    while ($categoria = $consulta->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $categoria["id"];
        $object->nom = $categoria["nom"];
        array_push($resultado, $object);
    }
    echo json_encode($resultado);
    mysqli_close($conexion);
?>
