<?php
require_once '../../../app/vendor/autoload.php';
session_start();
$client = new Google_Client();
$client->setAuthConfig('client_secrets.json');
$client->addScope(Google_Service_Analytics::ANALYTICS_READONLY);

// If the user has already authorized this app then get an access token
// else redirect to ask the user to authorize access to Google Analytics.
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
// Set the access token on the client.
  $client->setAccessToken($_SESSION['access_token']);
  // Create an authorized analytics service object.
  $analytics = new Google_Service_AnalyticsReporting($client);

//  $response = getReport($analytics);
//    header('Content-type: application/json');
//    printResults($response);
    
    

    if ($response = getReport($analytics)) {
        header('Content-type: application/json');
        printResults($response);
    }
    else {
        die(header("HTTP/1.0 404 Not Found"));
    }
} 

 

function getReport($analytics) {
    $VIEW_ID = "132231151";
    
    
    
    
    
    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
    
    if (isset($_POST['start']) && !empty($_POST['start'])) {
        $start = $_POST['start'];
        $end = $_POST['end'];
        $dateRange->setStartDate($start);
        $dateRange->setEndDate($end);
    } else {
//        $dateRange->setStartDate('2018-02-28');
//        $dateRange->setEndDate('2018-03-31');
        $dateRange->setStartDate('7daysAgo');
        $dateRange->setEndDate('today');
    }
  // Create the Metrics object.
    $metric = new Google_Service_AnalyticsReporting_Metric();
  $metric->setExpression($_POST['metric']);
//  $metric->setAlias("sessions");
    
    // Create Dimensions
    
        if (isset($_POST['dims'])) {
            
            $dimsData = json_decode(stripslashes($_POST['dims']));
            $dimsA = array();
            
            for ($i = 0; $i < count($dimsData); $i++) {
                
                ${"dimensions.$i"} = new Google_Service_AnalyticsReporting_Dimension();
                
                 ${"dimensions.$i"}->setName($dimsData[$i]);
                
                array_push($dimsA, ${"dimensions.$i"});
                
            } 
            
           
//            $ordering = new Google_Service_AnalyticsReporting_OrderBy();
//                    $ordering->setFieldName($dimsData);  
//                    $ordering->setSortOrder("ascending");
         
    }
    else {
            $dimension = new Google_Service_AnalyticsReporting_Dimension();
    //    $dimension->setName('ga:date');
        $dimension->setName($_POST['dimension']);
    //    $dimension2 = new Google_Service_AnalyticsReporting_Dimension();
    //    $dimension2->setName('ga:medium');
    }
    
//    $dimension = new Google_Service_AnalyticsReporting_Dimension();
////    $dimension->setName('ga:date');
//    
//    $dimension->setName($_POST['dimension']);
    
    
    
    
    
    
//    $dimension2 = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension2->setName('ga:medium');
    
    if (isset($_POST['sort'])) {
        $ordering = new Google_Service_AnalyticsReporting_OrderBy();
        $ordering->setFieldName($_POST['sort']);  
        $ordering->setSortOrder($_POST['order']);
    }
    
    
    
    
    
    // Dimension Filter
    
   // echo $_POST['filterName'];
      //  echo $_POST['filterVal'];
    
    if (isset($_POST['filter']) && isset($_POST['filterName']) && isset($_POST['filterVal']) ) {
        $dimFilter = new Google_Service_AnalyticsReporting_DimensionFilter();
        
     //   $dimFilter->setDimensionName('ga:region');
        
        $dimFilter->setDimensionName($_POST['filterName']);
        
        
        $dimFilter->setOperator('EXACT');
//        $dimFilter->setExpressions(array($_POST['filter']));
//        $dimFilter->setExpressions(array('Connecticut'));
        $dimFilter->setExpressions(array($_POST['filterVal']));
        
        
        
        
        $dimFilterClause = new Google_Service_AnalyticsReporting_DimensionFilterClause();
        $dimFilterClause->setFilters(array($dimFilter));
    }
    
    
    
    
  // Create the ReportRequest object.
    $request = new Google_Service_AnalyticsReporting_ReportRequest();
    $request->setViewId($VIEW_ID);
    $request->setIncludeEmptyRows('true');
    $request->setDateRanges($dateRange);
    
    if (isset($_POST['sort'])) {
        $request->setOrderBys($ordering);
    }
//  $request->setMetrics(array($pageviews));
    $request->setMetrics($metric);
//    $request->setDimensions(array($dates));
//    $request->setDimensions(array($dimension, $dimension2));
    
    
    
    
    
    $request->setDimensions($dimsA);
    
    
 //   $request->setDimensions(array($dimension));
    
//    if (isset($_POST['filter'])) {
//        $request->setDimensionFilterClauses(array($dimFilterClause));
//    }
    
    
    
    
    
//    $request->setSort('ga:date');
    
      $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
      $body->setReportRequests($request);
      return $analytics->reports->batchGet( $body );
}










function printResults($reports) {
    $returnArray = array();
    //print_r($reports);
      for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex++ ) {
        $report = $reports[ $reportIndex ];
        $header = $report->getColumnHeader();
        $dimensionHeaders = $header->getDimensions();
        $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
        $rows = $report->getData()->getRows();
        for ( $rowIndex = 0; $rowIndex < count($rows); $rowIndex++) {
          $row = $rows[ $rowIndex ];
          $dimensions = $row->getDimensions();
          $metrics = $row->getMetrics();
            
            if (isset($_POST['type']) && $_POST['type'] == 'time') {
                $d = strtotime($dimensions[0]);
                $t = $d * 1000 + 86400000;
                $rowArray = array( 
//                $dimensionHeaders[0] => $t
                'x'=> $t,
//                $metricHeaders[0]['name'] => $metrics[0]['values'][0], 
                'y'=> $metrics[0]['values'][0]
         //    $dimensionHeaders[0] => $dimensions[0] 
           //     $dimensionHeaders[1] => $dimensions[1] 
            );
            } 
            
            
            
            
//            if (isset($_POST['type']) && $_POST['type'] == 'map') {
//                
//                
//                
//                $rowArray = array();
//                
//                for ($i=0; $i < count($dimensions); $i++) {
//                    
//                    $coords = array(
//                        'x'=> $dimensions[0],
//                        'y'=> $dimensions[1]
//                    );
//                    
//                    
//                    array_push($rowArray, $coords); 
//                    
//                    
//                    
//                }
//                
//                
//                
//                
//                
//                
//                
//                
//                
//                
//            }
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            if (isset($_POST['type']) && $_POST['type'] == 'plot') {
                
                
              //  print_r($dimensions);
                
                
                $rowArray = array();
                
                for ($i=0; $i < count($dimensions); $i++) {
                    
                    $coords = array(
                        'x'=> $dimensions[0],
                        'y'=> $dimensions[1]
                    );
                    
                    
                    array_push($rowArray, $coords); 
                    
                    
                    
                }
       
                
               // print_r($coords);
                
                
                
                
            }
            
            
            
            if (isset($_POST['type']) && ($_POST['type'] == 'stateMap' || $_POST['type'] == 'countryMap' || $_POST['type'] == 'gMap' || $_POST['type'] == 'map' || $_POST['type'] == 'heatMap')) {
                
              //  echo 'map';
                
                
                $rowArray = array();
              //  array_push($rowArray, $dimensions);
                
                
                
//                $d = strtotime($dimensions[0]);
//                $t = $d * 1000 + 86400000;
//                $rowArray = array( 
////                $dimensionHeaders[0] => $t
//                'x'=> $t,
////                $metricHeaders[0]['name'] => $metrics[0]['values'][0], 
//                'y'=> $metrics[0]['values'][0]
//         //    $dimensionHeaders[0] => $dimensions[0] 
//           //     $dimensionHeaders[1] => $dimensions[1] 
//            );
                
                
                
         //       print_r(count($dimensions));
                
              //  for ($i=0; $i < count($dimensions); $i++) {
                    array_push($rowArray, ['dimensions' => $dimensions, 'metrics' => $metrics]); 
              //  }
       
            }
            
            
            else {
                
         
                
                $rowArray = array();
                for ($i=0; $i < count($dimensions); $i++) {
             // array_push($rowArray, [$dimensionHeaders[$i], $dimensions[$i]]);  
                    
//                    echo $dimensions[$i];
//                    print_r($metrics[$i]);
                    
                array_push($rowArray, [$metrics[$i],$dimensions[$i]]); 
                
                    
                }
                    
                    
              //array_push($rowArray, $dimensions[0]);  
            }
           // print_r($rowArray);
            array_push($returnArray, $rowArray);
            
        }
      }
    //print_r($returnArray);
    echo json_encode($returnArray);  
}

















?>
