<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';
session_start();

if (isset($_SESSION['AccountID']) && isset($_POST['DataType']) && !empty($_POST['DataType'])) {
    $dataType = $_POST['DataType'];
    $groupName = $_POST['GroupName'];
    
    
    
    
    
    
    
        if ($dataType == 'metric') {
//            $sth = $conn->prepare('SELECT MetricID AS id, UiName, Description FROM tb_Metrics WHERE GroupName = :p_GroupName ORDER BY UiName');
//            $sth->bindParam(':p_GroupName', $groupName, PDO::PARAM_STR);
//            $sth->execute();
//            if ($sth->execute()) {
//                $selectArray = array();
//                while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
//                    $selectArray[] = $row;
//                }
//                header('Content-type: application/json');
//                echo json_encode($selectArray); 
//            }
            
            $table = 'tb_Metrics';
        }
        
        
        if ($dataType == 'dimension') {
            $table = 'tb_Dimensions';
        }
        


        $sth = $conn->prepare('SELECT ID, UiName, Description FROM '.$table.' WHERE GroupName = :p_GroupName ORDER BY UiName');
            $sth->bindParam(':p_GroupName', $groupName, PDO::PARAM_STR);
            $sth->execute();
            if ($sth->execute()) {
                $selectArray = array();
                while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
                    $selectArray[] = $row;
                }
                header('Content-type: application/json');
                echo json_encode($selectArray); 
            }
    
    
    
    
    
    
    
    
    
    
    
    
//    function getcolumnData($results) {
//        echo '<table>';
//        $columns = $results->getItems();
//      if (count($columns) > 0) {
//        foreach ($columns as $column) {
//            $id = $column['id'];
//          $column_attributes = $column->getAttributes();
//            for ( $column = 0; $column < count($column_attributes['type']); $column++) {
//                if ($column_attributes['type'] == 'DIMENSION' && $column_attributes['status'] != 'DEPRECATED') {
//                    $group = $column_attributes['group'];
//                    $uiName = $column_attributes['uiName'];
//                    $description = $column_attributes['description'];
//                   echo '<tr>
//                   <td>'.$id.'</td>
//                   <td>'.$group.'</td>
//                   <td>'.$uiName.'</td>
//                   <td>'.$description.'</td>
//                   </tr>';
//                }
//              }
//        }
//      }
//        echo '</table>';
//    }
//    getcolumnData($results);
    
    
} 

 

?>
