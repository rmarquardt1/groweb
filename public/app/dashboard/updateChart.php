<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';

if(isset($_POST['Action']) && !empty($_POST['Action'])) {
    $action = $_POST['Action'];
    switch($action) {
        case 'create': createChart($conn); break;
        case 'delete': deleteChart($conn); break;
    }     
} else {
    echo 'not-set';
}


function deleteChart($conn) {
    $chartID = $_POST['ChartID'];
    $sth = $conn->prepare('CALL pd_CustomChart(:p_ChartID)');
    $sth->bindParam(':p_ChartID', $chartID, PDO::PARAM_INT);
    $sth->execute();
}

function createChart($conn) {
    $accountID = $_POST['AccountID'];
    $name = $_POST['Name'];
    $metrics = $_POST['Metrics'];
    $dimensions = $_POST['Dimensions'];
    $chartType = $_POST['ChartType'];
//    $height = $_POST['Height'];
//    $width = $_POST['Width'];
    $height = 'item-h-sm';
    $width = 'item-w-sm';
    $favorite = $_POST['Favorite'];
    $sth = $conn->prepare('CALL pi_CustomChart(:p_AccountID, :p_Name, :p_Metrics, :p_Dimensions, :p_ChartType, :p_Height, :p_Width, :p_Favorite)');
    $sth->bindParam(':p_AccountID', $accountID, PDO::PARAM_INT);
    $sth->bindParam(':p_Name', $name, PDO::PARAM_STR);
    $sth->bindParam(':p_Metrics', $metrics, PDO::PARAM_STR);
    $sth->bindParam(':p_Dimensions', $dimensions, PDO::PARAM_STR);
    $sth->bindParam(':p_ChartType', $chartType, PDO::PARAM_STR);
    $sth->bindParam(':p_Height', $height, PDO::PARAM_STR);
    $sth->bindParam(':p_Width', $width, PDO::PARAM_STR);
    $sth->bindParam(':p_Favorite', $favorite, PDO::PARAM_INT);
    $sth->execute();
}

$conn = null;

?>


    
    
    
    
    
    
    
    
    
    
    
    
    