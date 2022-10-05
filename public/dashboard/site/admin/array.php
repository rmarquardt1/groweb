<?php



//
//if (isset($_POST['dims'])) {
//    $dimsData = json_decode(stripslashes($_POST['dims']));
//    $dimsAB = array();
//    for ($i = 0; $i < count($dimsData); $i++) {
////           array_push($dimsAB, $dimsData[$i]);
////            echo 'dimensions'.$i;
//        ${"dimensions.$i"} = $i;
//        array_push($dimsAB, ${"dimensions.$i"});
//        
//        
//    } 
//    echo json_encode($dimsAB);
//}






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
  $VIEW_ID = "161095754";
    
    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate('2017-12-01');
  $dateRange->setEndDate('2018-03-13');
    

  // Create the Metrics object.
    $metric = new Google_Service_AnalyticsReporting_Metric();
  $metric->setExpression('ga:sessions');
//  $metric->setAlias("sessions");
    
    
    
  //    Create Dimensions   
    
    if (isset($_POST['dims'])) {
            $dimsData = json_decode(stripslashes($_POST['dims']));
            $dimsA = array();
            
            for ($i = 0; $i < count($dimsData); $i++) {
                
                ${"dimensions.$i"} = new Google_Service_AnalyticsReporting_Dimension();
                
                 ${"dimensions.$i"}->setName($dimsData[$i]);
                
                array_push($dimsA, ${"dimensions.$i"});
                
                //echo 'hello';
            } 
         
    }
    else {
            $dimension = new Google_Service_AnalyticsReporting_Dimension();
    //    $dimension->setName('ga:date');
        $dimension->setName($_POST['dimension']);
    //    $dimension2 = new Google_Service_AnalyticsReporting_Dimension();
    //    $dimension2->setName('ga:medium');
    }
    
//    $dimension = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension->setName('ga:deviceCategory');
//    
//    $dimension1 = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension1->setName('ga:operatingSystem');
//    
//    $dimension2 = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension2->setName('ga:browser');
    
    // Dimension Filter
    
//    if (isset($_POST['filter'])) {
//        $dimFilter = new Google_Service_AnalyticsReporting_DimensionFilter();
//        $dimFilter->setDimensionName('ga:medium');
//        $dimFilter->setOperator('EXACT');
//        $dimFilter->setExpressions(array($_POST['filter']));
//        $dimFilterClause = new Google_Service_AnalyticsReporting_DimensionFilterClause();
//        $dimFilterClause->setFilters(array($dimFilter));
//    }
    
  // Create the ReportRequest object.
    $request = new Google_Service_AnalyticsReporting_ReportRequest();
    $request->setViewId($VIEW_ID);
    $request->setIncludeEmptyRows('true');
    $request->setDateRanges($dateRange);
    
    $request->setMetrics($metric);
//    $request->setDimensions(array($dimension, $dimension2));
    
    
//    if (isset($_POST['dims'])) {
//        $dimsA = array();
//        for ($i = 0; $i < count($dimsData); $i++) {
//
//            array_push($dimsA, ${'dimension$i'});
//            
//            
//       
//        
//        }
//        $request->setDimensions($dimsA);
//    }
//    else {
//        $request->setDimensions(array($dimension));
//    }
    
    //$request->setDimensions(array($dimension));
    
//    $request->setDimensions(array($dimension, $dimension1, $dimension2));
    
    
    $request->setDimensions($dimsA);
    
    
    
    
    if (isset($_POST['filter'])) {
        $request->setDimensionFilterClauses(array($dimFilterClause));
    }
    
    
    
    
    
//    $request->setSort('ga:date');
    
      $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
      $body->setReportRequests($request);
      return $analytics->reports->batchGet( $body );
}










function printResults($reports) {
    $returnArray = array();
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
            } else {
                $rowArray = array();
                for ($i=0; $i < count($dimensions); $i++)
              array_push($rowArray, [$dimensionHeaders[$i], $dimensions[$i]]);  
            }
            array_push($returnArray, $rowArray);
        }
      }
    echo json_encode($returnArray);  
    
    
   // echo json_encode($dimsA);
}

















?>
