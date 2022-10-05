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

  // Call the Analytics Reporting API V4.
    
  $response = getReport($analytics);
    header('Content-type: application/json');
    printResults($response);
    
} 




//function getReport($analytics) {
//  $VIEW_ID = "161095754";
//    
//    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
//  $dateRange->setStartDate('90daysAgo');
//  $dateRange->setEndDate('today');
//    
//
//  // Create the Metrics object.
//    $metric = new Google_Service_AnalyticsReporting_Metric();
//  $metric->setExpression('ga:sessions');
////  $metric->setAlias("sessions");
//    
//    // Create Dimensions
//    $dimension = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension->setName('ga:date');
//    
//    $dimension2 = new Google_Service_AnalyticsReporting_Dimension();
//    $dimension2->setName('ga:medium');
//    
//    
//    $ordering = new Google_Service_AnalyticsReporting_OrderBy();
//    $ordering->setFieldName("ga:date");  
//    $ordering->setSortOrder("ascending");
//    
//    
//  // Create the ReportRequest object.
//  $request = new Google_Service_AnalyticsReporting_ReportRequest();
//  $request->setViewId($VIEW_ID);
//    $request->setIncludeEmptyRows('true');
//  $request->setDateRanges($dateRange);
//    $request->setOrderBys($ordering);
//    
////  $request->setMetrics(array($pageviews));
//    $request->setMetrics($metric);
//    
////    $request->setDimensions(array($dates));
//    $request->setDimensions(array($dimension, $dimension2));
////    $request->setSort('ga:date');
//    
//  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
//  $body->setReportRequests($request);
//  return $analytics->reports->batchGet( $body );
//}







function getReport($analytics) {
  $VIEW_ID = "161095754";
    
    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate('90daysAgo');
  $dateRange->setEndDate('today');
    

  // Create the Metrics object.
    $metric = new Google_Service_AnalyticsReporting_Metric();
  $metric->setExpression('ga:sessions');
//  $metric->setAlias("sessions");
    
    // Create Dimensions
    $dimension = new Google_Service_AnalyticsReporting_Dimension();
    $dimension->setName('ga:date');
    
    
    $ordering = new Google_Service_AnalyticsReporting_OrderBy();
    $ordering->setFieldName("ga:date");  
    $ordering->setSortOrder("ascending");
    
    
  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
    $request->setIncludeEmptyRows('true');
  $request->setDateRanges($dateRange);
    $request->setOrderBys($ordering);
    
//  $request->setMetrics(array($pageviews));
    $request->setMetrics($metric);
    
//    $request->setDimensions(array($dates));
    $request->setDimensions(array($dimension));
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
            $rowArray = array( 
                $metricHeaders[0]['name'] => $metrics[0]['values'][0], 
                $dimensionHeaders[0] => $dimensions[0]
              //  $dimensionHeaders[1] => $dimensions[1] 
            );
            array_push($returnArray, $rowArray);
        }
      }
    echo json_encode($returnArray);  
}

















?>
