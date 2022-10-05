<?php

include '../../resources/engine/db_connect.php';

//$stop = $_POST['stop'];

$sth = $conn->prepare('SELECT * FROM tb_Templates');
$sth->execute();
$result = $sth->rowCount();
echo json_encode($result);

$conn = null;

?>