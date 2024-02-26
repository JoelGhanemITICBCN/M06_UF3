<?php
$servername = "localhost";
$dbname = "fetchselects";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
}

$cat = isset($_POST['cat1']) ? $_POST['cat1'] : '';

try {
    $stmt = $conn->prepare("SELECT * FROM subcategorias WHERE id_categoria = :cat");
    $stmt->bindParam(':cat', $cat);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $return = array();

    foreach ($result as $row) {
        $object = new stdClass();
        $object->nom = $row["nom"];
        $object->id = $row["id"];
        $return[] = $object;
    }

    echo json_encode($return);
} catch(PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
