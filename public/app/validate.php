<?php

  session_start();

if(!isset($_SESSION['signed_in'])) {
    $_SESSION['flash_error'] = "Please sign in";
    header("Location: /index.php");
    exit; // IMPORTANT: Be sure to exit here!
  }

?>



