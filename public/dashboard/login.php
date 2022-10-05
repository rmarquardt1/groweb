<?php

include '../../resources/engine/db_connect.php';

$username = $_POST['username'];
$password_sha1 = sha1($_POST['password']);

$sql  = "SELECT username ";
$sql .= "FROM user ";
$sql .= "WHERE username=:u AND password_sha1=:p";
$sth = $conn->prepare($sql);
$sth->execute(array(
":u"=>$username,
":p"=>$password_sha1
));
$row = $sth->fetch();

// clear out any existing session that may exist
session_start();
session_destroy();
session_start();

if ($row) {
$_SESSION['signed_in'] = true;
$_SESSION['username'] = $username;
header("Location: site/admin/dashboard.php");
} else {
$_SESSION['flash_error'] = "Invalid username or password";
$_SESSION['signed_in'] = false;
$_SESSION['username'] = null;
header("Location: /index.php");
}






?>