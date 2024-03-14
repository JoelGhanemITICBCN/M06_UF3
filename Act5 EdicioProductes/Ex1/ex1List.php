<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Llistat</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<?php

$servername = "localhost";
$dbname = "edicioProductes";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM productes";

$result = $conn->query($sql);

$array = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($array, array("id" => $row["id"], "nom" => $row["nom"]));
    }
} else {
    echo "0 results";
}

$conn->close();
?>


<body class="container mt-5 w-80">
    <h2 class="mb-3">Llistat</h2>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
            </tr>
        </thead>

        <tbody>
            <?php
            for ($i = 0; $i < sizeof($array); $i++) {
                echo '<tr>
                                <th scope="row">' . $array[$i]["id"] . '</th>
                                <td>' . $array[$i]["nom"] . '</td>
                                <td><a href="ex1Form.php?id=' . $array[$i]["id"] . '" class="btn btn-outline-info">Edit</a></td>
                                <td><a href="eliminaProducte.php?id=' . $array[$i]["id"] . '" class="btn btn-outline-danger remove-btn" data-id="' . $array[$i]["id"] . '">Remove</a></td>
                            </tr>';
            }
            ?>
        </tbody>
    </table>

    <script>
        let btnElimina = document.querySelectorAll(".remove-btn");
        btnElimina.forEach(el => {
            el.addEventListener("click", function(event) {
                event.preventDefault();

                let idProducto = this.getAttribute("data-id");

                if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                    let formData = new FormData();
                    formData.append("id", idProducto);

                    let options = {
                        method: 'POST',
                        body: formData
                    };

                    fetch("eliminaProducte.php", options)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                // Eliminación exitosa, actualizar la página o el contenido necesario
                                location.reload();
                            } else {
                                alert("Error al eliminar el producto.");
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            });
        });
    </script>
</body>

</html>
