<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php
    $servername = "localhost";
    $dbname = "fetchselects";
    $username = "root";
    $password = "";
    $conexion = mysqli_connect($servername, $username, $password, $dbname);
    if (mysqli_ping($conexion)) {
        $categoriaBD = $_POST["categories"];
        $select = "select * from subcategorias where id_categoria = $categoriaBD";
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
    }
    ?>
</body>

</html>