<?php

//if($_POST){

if(isset($_POST['form_name'], $_POST['form_email'], $_POST['form_subject'], $_POST['form_body'])) {
    $name = $_POST['form_name'];
    $email = $_POST['form_email'];
    $subject = $_POST['form_subject'];
    $body = $_POST['form_body'];
    $message = "
    <html>
    <head></head>
    <body>
    Name: $name <br/>
    Email: $email <br/>
    Subject: $subject <br/>
    Message:<br/> $body
    </body>
    </html>
    ";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    mail("rmarquardt.1@gmail.com", "groWeb form submission from" .$email, $message, $headers);
    
}
    
//    if ($success) {
//        echo 'successful';
//    }
//    if (!$success) {
//        echo 'error';
//        $errorMessage = error_get_last()['message'];
//        echo $errorMessage;
//    }
    
    
//}

?>