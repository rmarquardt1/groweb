<?php
include 'C:\websites\groweb\resources\engine\db_connect.php';
session_start();
if (isset($_SESSION['AccountID'])) {
    $accountID = $_SESSION['AccountID'];
    $qry = 'CALL pr_CustomViews('.$accountID.', "custom")';
} else {
    echo 'session is not set';
}


function getMetricGroups($conn) {
    $sth = $conn->prepare('SELECT DISTINCT GroupName FROM tb_Metrics ORDER BY GroupName');
    $sth->execute();
    if ($sth->execute()) {
        while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
            //print_r($row);
            $group = $row['GroupName'];
            echo '<option value="'.$group.'">'.$group.'</option>';
        }
    }
}


function getDimensionGroups($conn) {
    $sth = $conn->prepare('SELECT DISTINCT GroupName FROM tb_Dimensions ORDER BY GroupName');
    $sth->execute();
    if ($sth->execute()) {
        while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
            //print_r($row);
            $group = $row['GroupName'];
            echo '<option value="'.$group.'">'.$group.'</option>';
        }
    }
}



$script = '';
$charts = '';
$table = '<div class="row row-top" id="customMenuContainer">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h4>Custom Charts</h4>
        <div class="dashboard-button add-chart">
        <i class="fas fa-plus-circle"></i>Add Chart</div>
            <table id="customMenus" class="table table-striped">
                <tr>
                    <th>Name</th>
                    <th>Metrics</th>
                    <th>Dimensions</th>
                    <th>Chart Type</th>
                    <th>Favorite</th>
                    <th></th>
                </tr>';

echo '<div class="container">
<div id="addChartDialog">
<div id="customFields">
<div id="customFieldsInner">
<div class="field">
<label>Name</label>
<input type="text" name="CustomName" id="f_CustomName" />
</div>
<div class="field">
<label>Chart Type</label>
<select name="CustomType" id="f_CustomType">
<option value="bar">Bar</option>
<option value="pie">Pie</option>
</select>
</div>
<div class="field">
<label>Metric Group</label>
<select name="MetricGroup" id="f_MetricGroup">
<option value=""></option>';

getMetricGroups($conn);
    
echo '</select>
</div>
<div class="field">
<label>Metric</label>
<select name="CustomMetrics" id="f_CustomMetrics">
<option value=""></option>
</select>
</div>



<div class="field">
<label>Dimension Group</label>
<select name="DimensionGroup" id="f_DimensionGroup">
<option value=""></option>';

getDimensionGroups($conn);


echo '</select></div><div class="field">
<label>Dimensions</label>
<select name="CustomDimensions" id="f_CustomDimensions">
<option value="ga:browser">Browser</option>
<option value="ga:operatingSystem">Operating System</option>
<option value="ga:deviceCategory">Device</option>
</select>
</div>
<div class="field">
<label>Favorite</label>
<select name="Favorite" id="f_Favorite">
<option value=""></option>
<option value="1">Yes</option>
<option value="0">No</option>
</select>
</div>
<button id="customClose">Close</button>
<button id="customSave" value="Save">Save</button>
<button id="customPreview">Preview</button>
</div>
<div id="preview"></div>
</div>
</div>';

foreach ($conn->query($qry) as $result) {
    $chartID = $result['ChartID'];
    $name = $result['Name'];
    $metrics = $result['Metrics'];
    $dimensions = $result['Dimensions'];
    $chartType = $result['ChartType'];
    $position = $result['Position'];
    $height = $result['Height'];
    $width = $result['Width'];
    $fav = $position = $result['Favorite'];
    $table.='<tr>
                    <td>'.$name.'</td>
                    <td>'.$metrics.'</td>
                    <td>'.$dimensions.'</td>
                    <td>'.$chartType.'</td>
                    <td>';
    if ($fav == '1') {
        $table.='<i class="fas fa-star fav fav-update" data-chartid="'.$chartID.'" data-fav="1"></i>';
    } else {
        $table.='<i class="fas fa-star fav-update" data-chartid="'.$chartID.'" data-fav="0"></i>';
    } 
    if ($chartType == 'pie') {
        $gridClass = 'card-grid-legend';
    }
    else {
        $gridClass = 'card-grid';
    }
    $table.='</td>
    <td align="right">
    <i class="fas fa-edit" data-action="edit" data-chartid="'.$chartID.'"></i>
    <i class="fas fa-times-circle" data-action="delete" data-chartid="'.$chartID.'"></i>
    </tr>';
    
    $charts.= '<div class="box '.$height.' '.$width.'">
            <div class="card-wrapper chart-sm">
                <h4>'.$name.'</h4>
                <div class="card shadow">
                    <div class="card-body '.$gridClass.'">
                        <div class="chart-options">
                            <label>Chart Type</label>
                            <select class="change-chart-view">
                            <option></option>
                            <option value="bar">Bar</option>
                            <option value="pie">Pie</option>
                        </select>
                        </div>
                        <div id="chart'.$chartID.'" class="chart-container" data-dimensions="'.$dimensions.'" data-metrics="'.$metrics.'"></div>
                        <div id="'.$chartID.'legend" class="legend"></div>
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
            legend: document.getElementById("'.$chartID.'legend")
        });';
}

$table.='</table></div></div>';

echo $table;

echo '<div class="row">
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<div class="grid-wrapper">';

echo $charts;

echo '</div></div></div><script>'.$script.'</script>';

$conn = null;

?>


    
    
    
    
    
    
    
    
    
    
    
    
    