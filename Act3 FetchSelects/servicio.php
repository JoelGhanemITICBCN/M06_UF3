<?php
header('Content-Type: application/json');

$servername = "localhost";
$dbname = "fetchselects";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $cat = isset($_POST['cat']) ? $_POST['cat'] : '';

    try {
        $stmt = $conn->prepare("SELECT * FROM subcategorias WHERE id_categoria = :cat");
        $stmt->bindParam(':cat', $cat);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $return = array();

        foreach ($result as $row) {
            $object = new stdClass();
            $object->nombre = $row["nombre"];
            $object->id = $row["id"];
            $return[] = $object;
        }

        echo json_encode($return);
    } catch (PDOException $e) {
        echo json_encode(array('error' => 'Error en la consulta: ' . $e->getMessage()));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Error en la conexión: ' . $e->getMessage()));
} finally {
    $conn = null;
}
?>
