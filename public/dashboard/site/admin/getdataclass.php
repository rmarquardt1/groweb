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




 





function getReport($analytics) {
//  $VIEW_ID = "161095754";
    $VIEW_ID = "132231151";
    $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate($_POST['date_start']);
  $dateRange->setEndDate($_POST['date_end']);
    

  // Create the Metrics object.
    $metric = new Google_Service_AnalyticsReporting_Metric();
  $metric->setExpression($_POST['metric']);
//  $metric->setAlias("sessions");
    
    // Create Dimensions
    $dimension = new Google_Service_AnalyticsReporting_Dimension();
    $dimension->setName($_POST['dimension']);
    
  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
    
//  $request->setMetrics(array($pageviews));
    $request->setMetrics(array($metric));
    
//    $request->setDimensions(array($dates));
    $request->setDimensions(array($dimension));

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );
  return $analytics->reports->batchGet( $body );
}





function printResults($reports) {
    $dim = array();
    $met = array();
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
      for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); $i++) {
          
          if (isset($_POST['type']) && $_POST['type'] == 'time') {
           $d = strtotime($dimensions[$i]);
          $t = $d * 1000 + 86400000;
         array_push($dim, $t);  
          } else {
              array_push($dim, $dimensions[$i]);  
          }   
      }
      for ($j = 0; $j < count($metrics); $j++) {
        $values = $metrics[$j]->getValues();
        for ($k = 0; $k < count($values); $k++) {
            array_push($met, $metrics[$k]);
        }
      }
    }
      $pvArray = array(
            $dim,
            $met
        );
    echo json_encode($pvArray);  
  }
}

















?>
