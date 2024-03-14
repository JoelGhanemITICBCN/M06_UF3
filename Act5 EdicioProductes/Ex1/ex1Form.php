<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulari</title>
</head>

<?php
if (isset($_GET["id"]) && !empty($_GET["id"])) {

    $servername = "localhost";
    $dbname = "edicioProductes";
    $username = "root";
    $password = "";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM productes WHERE id=" . $_GET["id"];

    $result = $conn->query($sql);

    $array = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nom = $row["nom"];
        $addEdit = $row["id"];
    } else {
        echo "0 results";
    }

    $conn->close();
} else {
    $nom = "";
    $addEdit = 0;
}

?>
<body class="container mt-5 w-80">
    <h2 class="mb-3">Formulari</h2>
    <form action="ex1AddEdit.php" method="POST">
        <div class="form-group mb-2">
            <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="<?php echo $nom; ?>">
        </div>
        <input type="hidden" name="addEdit" value="<?php echo $addEdit; ?>" />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</body>
</html>