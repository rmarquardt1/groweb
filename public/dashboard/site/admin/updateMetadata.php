<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';
require_once '../../../app/vendor/autoload.php';
session_start();
$client = new Google_Client();
$client->setAuthConfig('client_secrets.json');
$client->addScope(Google_Service_Analytics::ANALYTICS_READONLY);


if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    

    
    
    
    
    
    
    
    
// Set the access token on the client.
  $client->setAccessToken($_SESSION['access_token']);
  // Create an authorized analytics service object.
  
    
    /**
 * 1. Execute a Metadata Request
 * An application can request columns data by calling the list method on the Analytics service object.
 * The method requires an reportType parameter that specifies the column data to retrieve.
 * For example, the following code requests columns for the ga report type.
 */
    
    
    

try {
$analytics = new Google_Service_Analytics($client);
  $results = $analytics->metadata_columns->listMetadataColumns('ga');
    
   // $results->setAttributeNames('type');
   // $typee = $results->getAttributeNames();
  //  header('Content-type: application/json');
  //  print_r($typee);
   $gett = $results->getItems();
    $items = $results->getItems();
    
    
    
  //  print_r($items);
    //print_r($results->getItems());
  // Success
    //echo 'try good';
   // print_r($results);

} catch (apiServiceException $e) {
  // Handle API service exceptions.
  $error = $e->getMessage();
}


/**
 * 2. Print out the Columns data
 * The components of the result can be printed out as follows:
 */
    
    
    
    
     function updateDimensions($results, $conn) {
        $columns = $results->getItems();
      if (count($columns) > 0) {
        foreach ($columns as $column) {
            $id = $column['id'];
            
            
          $column_attributes = $column->getAttributes();
             
            for ( $column = 0; $column < count($column_attributes['type']); $column++) {
               
                if ($column_attributes['type'] == 'DIMENSION' && $column_attributes['status'] != 'DEPRECATED') {
                    $group = $column_attributes['group'];
                    $uiName = $column_attributes['uiName'];
                    $description = $column_attributes['description'];
                    
                    $sth = $conn->prepare('CALL pi_Dimension(:p_DimensionID, :p_GroupName, :p_UiName, :p_Description)');
                    
                    $sth->bindParam(':p_DimensionID', $id, PDO::PARAM_STR);
                    $sth->bindParam(':p_GroupName', $group, PDO::PARAM_STR);
                    $sth->bindParam(':p_UiName', $uiName, PDO::PARAM_STR);
                    $sth->bindParam(':p_Description', $description, PDO::PARAM_STR);
                     $sth->execute();
                }
                
                if ($column_attributes['type'] == 'METRIC' && $column_attributes['status'] != 'DEPRECATED') {
                    $group = $column_attributes['group'];
                    $uiName = $column_attributes['uiName'];
                    $description = $column_attributes['description'];
                    
                    $sth = $conn->prepare('CALL pi_Metric(:p_MetricID, :p_GroupName, :p_UiName, :p_Description)');
                    
                    $sth->bindParam(':p_MetricID', $id, PDO::PARAM_STR);
                    $sth->bindParam(':p_GroupName', $group, PDO::PARAM_STR);
                    $sth->bindParam(':p_UiName', $uiName, PDO::PARAM_STR);
                    $sth->bindParam(':p_Description', $description, PDO::PARAM_STR);
                     $sth->execute();
                }
                
                
              }
        }
      }
        
        

        
        
        
    }
    
    
    
    updateDimensions($results, $conn);
    
    
    
    
    
    
    
    
    
    
    
    
//    
//    function getcolumnData($results) {
//        echo '<table>';
//        $columns = $results->getItems();
////        header('Content-type: application/json');
////        print_r($columns);
//      if (count($columns) > 0) {
//        foreach ($columns as $column) {
//            $id = $column['id'];
//            
//            
//          $column_attributes = $column->getAttributes();
//             
//            for ( $column = 0; $column < count($column_attributes['type']); $column++) {
//               
//                if ($column_attributes['type'] == 'DIMENSION' && $column_attributes['status'] != 'DEPRECATED') {
//                    $group = $column_attributes['group'];
//                    $uiName = $column_attributes['uiName'];
//                    $description = $column_attributes['description'];
//                    
//                   echo '<tr>
//                   <td>'.$id.'</td>
//                   <td>'.$group.'</td>
//                   <td>'.$uiName.'</td>
//                   <td>'.$description.'</td>
//                   </tr>';
//                    
//                    
//                    
//                }
//                
//              }
//        }
//      } else {
//      //  $html = '<p>No Results Found.</p>';
//      }
//    //  print $html;
//        
//        
//        echo '</table>';
//        
//        
//        
//    }
//    
//    
//    
//    getcolumnData($results);
    

//    function printColumns(&$results) {
//      $columns = $results->getItems();
//      if (count($columns) > 0) {
//        $html = '<h2>Columns</h2>';
//        foreach ($columns as $column) {
//
//          $html .= '<h3>' . $column->getId() . '</h3>';
//          $column_attributes = $column->getAttributes();
//          foreach ($column_attributes as $name=>$value) {
//            $html .= <<<HTML
//        <pre>
//        {$name}: {$value}
//        </pre>
//        HTML;
//              }
//        }
//      } else {
//        $html = '<p>No Results Found.</p>';
//      }
//      print $html;
//        
//    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//
//function printMetadataReport($results) {
//  print '<h1>Metadata Report</h1>';
//  printReportInfo($results);
//  printAttributes($results);
//  printColumns($results);
//}
//    
//
//
//function printReportInfo(&$results) {
//  $html = '<h2>Report Info</h2>';
//  $html .= <<<HTML
//<pre>
//Kind                  = {$results->getKind()}
//Etag                  = {$results->getEtag()}
//Total Results         = {$results->getTotalResults()}
//</pre>
//HTML;
//  print $html;
//}
//
//
//function printAttributes(&$results) {
//  $html = '<h2>Attribute Names</h2><ul>';
//  $attributes = $results->getAttributeNames();
//  foreach ($attributes as $attribute) {
//    $html .= '<li>'. $attribute . '</li>';
//  }
//  $html .= '</ul>';
//  print $html;
//}
//
//
//function printColumns(&$results) {
//  $columns = $results->getItems();
//  if (count($columns) > 0) {
//    $html = '<h2>Columns</h2>';
//    foreach ($columns as $column) {
//      $html .= '<h3>' . $column->getId() . '</h3>';
//      $column_attributes = $column->getAttributes();
//      foreach ($column_attributes as $name=>$value) {
//        $html .= <<<HTML
//<pre>
//{$name}: {$value}
//</pre>
//HTML;
//      }
//    }
//  } else {
//    $html = '<p>No Results Found.</p>';
//  }
//  print $html;
//}
    
    
    
    
    

    
    
    
} 

 






























?>
