<?php

if (isset($_POST["submit"]) && !empty($_POST["submit"])) {
    $name = $_POST['fname'];
    $email = $_POST['femail'];
    $subject = $_POST['fsubject'];
    $body = $_POST['fbody'];
}
    $myemail = "rmarquardt.1@gmail.com";
    $emess = "Name: $name \n";
    $emess.= "Email: $email \n";
    $emess.= "Subject: $subject \n";
    $emess.= "Body: $body \n";
    $ehead = "From: contact@mygroweb.com \r\n";
    $subj = "groWeb form submission from $fname !";
    $mailsend=mail("$myemail","$subj","$emess","$ehead");

?>



