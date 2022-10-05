<?php

include 'engine/db_connect.php';

// $qry = 'SELECT * FROM tb_Templates';
$qry = 'CALL pr_TemplatesRetrieve(0, 2)';
foreach ($conn->query($qry) as $result) {
//    echo '<div class="col-lg-4 col-md-4">
//                    <h4>'; echo $result['Name']; echo '</h4>
//                    <div class="template" id="'; echo $result['NameID']; echo '">
//                        <img src="'; echo $result['Path']; echo 'thumb.png" class="screenshot shadow" />
//                        <a class="view desktop-view" data-viewtype="desktop">Desktop</a>
//                        <a class="view tablet-view" data-viewtype="tablet">Tablet</a>
//                        <a class="view mobile-view" data-viewtype="mobile">Mobile</a>
//                    </div>
//                </div>';
    
    print json_encode($result);
    
}



//$stmt = $conn->prepare($qry);
//
//
//
//
//
//$rows = array();
//
//while($r = mysqli_fetch_assoc($stmt)) {
//    $rows[] = $r;
//}
//print json_encode($rows);






$conn = null;

?>