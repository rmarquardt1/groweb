<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';
if (isset($_SESSION['AccountID'])) {
    $accountID = $_SESSION['AccountID'];
    $qry = 'CALL pr_ChartFavorites('.$accountID.')';
} else {
    echo 'session is not set';
}

$script = '';
$charts = '';

foreach ($conn->query($qry) as $result) {
    $chartID = $result['ChartID'];
    $name = $result['Name'];
    $metrics = $result['Metrics'];
    $dimensions = $result['Dimensions'];
    $chartType = $result['ChartType'];
    $position = $result['Position'];
    $height = $result['Height'];
    $width = $result['Width'];
    $sortBy = $result['SortBy'];
    $sortOrder = $result['SortOrder'];
    
    if ($chartType == 'pie' || $chartType == 'donut' || $chartType == 'bar') {
        $gridClass = 'card-grid-legend';
    }
    else {
        $gridClass = 'card-grid';
    }
    
    
    $charts.= '<div id="chart'.$chartID.'box" class="box '.$height.' '.$width.'">
                    <div class="card-wrapper chart-sm">
                    <h4>'.$name.'</h4>
                        <div class="card shadow">
                            <div class="card-body '.$gridClass.'">
                                <div class="chart-options">
                                    <div class="chart-type">
                                        <i class="fas fa-chart-pie pie-type" data-type="pie" onclick="changeChart()"></i>
                                        <i class="fas fa-chart-line line-type" data-type="line" onclick="changeChart()"></i>
                                        <i class="fas fa-chart-bar bar-type" data-type="bar" onclick="changeChart()"></i>
                                        <i class="fas fa-chart-area area-type" data-type="area" onclick="changeChart()"></i>
                                    </div>
                                </select>
                                </div>
                                <div id="chart'.$chartID.'" class="chart-container" data-dimensions="'.$dimensions.'" data-metrics="'.$metrics.'"></div>
                                <div id="'.$chartID.'legend" class="legend '.$chartID.'legend"></div>
                            </div>
                        </div>
                    </div>
                </div>';
    
    $script.= '$().getDeviceData({
            domElement: document.getElementById("chart'.$chartID.'"),
            chartType: "'.$chartType.'",
            chartElement: "#chart'.$chartID.'",
            dimensions: "'.$dimensions.'",
            metrics: "'.$metrics.'",
            legend: document.getElementById("'.$chartID.'legend"),
            sortBy: "'.$sortBy.'" ,
            sortOrder: "'.$sortOrder.'",
            chartBox: "#chart'.$chartID.'box"
        });';
    
}

echo $charts;
echo '<script>'.$script.'</script>';
$conn = null;

?>


    
    
    
    
    
    
    
    
    
    
    
    
    