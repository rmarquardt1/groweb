<?php

include '../../resources/engine/db_connect.php';

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'pageCount': pageCount($conn); break;
        case 'pagePopulate': pagePopulate($conn); break;
    
    
    }
}

function pageCount($conn) {
    $sth = $conn->prepare('SELECT * FROM tb_Templates');
    $sth->execute();
    $result = $sth->rowCount();
    echo json_encode($result);
}

function pagePopulate($conn) { 
    
    $start = $_POST['start'];
    $stop = $_POST['stop'];
    
    $sth = $conn->prepare('CALL pr_TemplatesRetrieve(:start, :stop)');
    $sth->bindParam(':start', $start, PDO::PARAM_INT);
    $sth->bindParam(':stop', $stop, PDO::PARAM_INT);
    $sth->execute();
    
    $rows = array();
    
    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $result;
    }
    
    header('Content-type: application/json');
    echo json_encode($rows);
    
    
    
    
    
}





//$start = $_POST['start'];
//$stop = $_POST['stop'];
//
//$sth = $conn->prepare('CALL pr_TemplatesRetrieve(:start, :stop)');
//$sth->bindParam(':start', $start, PDO::PARAM_INT);
//$sth->bindParam(':stop', $stop, PDO::PARAM_INT);
//$sth->execute();
//
//$rows = array();
//
//while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
//    $rows[] = $result;
//}
//
//header('Content-type: application/json');
//echo json_encode($rows);












$conn = null;

?>