<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';

//session_start();
//if (isset($_SESSION['AccountID'])) {
//    $accountID = $_SESSION['AccountID'];
//    $qry = 'CALL pr_CustomViews('.$accountID.', "custom")';
//} else {
//    echo 'session is not set';
//}

if(isset($_POST['chartId']) && !empty($_POST['chartId'])) {
    
    $chartID = $_POST['chartId'];
    $fav = $_POST['fav'];
  //  $fav = 1;
   // $fav = 0;
    echo $fav;
    
    $qry = "CALL pu_Favorite($chartID, $fav)";
    $conn->query($qry);
    
//    $sth = $conn->prepare('CALL pu_Favorite(:param_ChartID, :param_Favorite)');
//    $sth->bindParam(':param_ChartID', $chartID, PDO::PARAM_INT);
//    $sth->bindParam(':param_Favorite', $fav, PDO::PARAM_INT);
//    $sth->execute();
   // echo $chartID;
    
    //echo $fav;
    
  //  echo $success;
} else {
    echo 'not-set';
}



$conn = null;

?>


    
    
    
    
    
    
    
    
    
    
    
    
    