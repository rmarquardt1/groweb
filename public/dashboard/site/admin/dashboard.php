<?php 
session_start();
$_SESSION['AccountID'] = '1001';
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
} else {
  $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/dashboard/site/admin/oauth2callback.php';
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}
?>
<!DOCTYPE html>
<html class="height-100">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!--
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-26384701-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-26384701-2');
    </script> 
-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Dashboard</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--
    <meta name="google-signin-client_id" content="765346715121-pjikk41vb25s75mu7a29rdtqt2canhg3.apps.googleusercontent.com">
    <meta name="google-signin-scope" content="https://www.googleapis.com/auth/analytics.readonly">
-->
    <base href="http://dev.groweb.com/" />
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/plugins.css" />
    <link rel="stylesheet" href="assets/css/jquery.mCustomScrollbar.min.css" />
    <link rel="stylesheet" href="assets/js/plugins/chartist/chartist.min.css" />
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css" />
    <style></style>
    <script src="assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    <script defer src="http://use.fontawesome.com/releases/v5.0.8/js/all.js" integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ" crossorigin="anonymous"></script>
</head>







<body data-spy="scroll" data-target="#main-navbar" class="height-100">
    <div class='preloader'>
        <div class='loaded'>&nbsp;</div>
    </div>
    <section id="dashboard-area" class="sections height-100">
        <div class="page-title">
            <div class="page-title-overlay"></div>
            <div class="page-title-inner container ">
                <img src="assets/images/groweb_logo_org.svg" />
                <h1>ADMIN DASHBOARD</h1>
                <a href="/dashboard/site/admin/oauth2callback.php" class="authenticate">Authenticate</a>
            </div>
        </div>

        <div class="row height-100 main-row">
            <div id="sidebar">
                <div id="dashboardMenu">
                    <ul class="main-list">
                        <li id="homePage" data-page="main.php">Home</li>
                        <li id="homePage" data-page="location.php">Location</li>
                        <li id="devicePage" data-page="devices.php">Devices</li>
                        <li id="customPage" data-page="custom.php">Custom</li>
                    </ul>
                </div>
            </div>

            <div id="pageContainer"></div>
            
            
<!--            <div class="slideMenu">-->

            <div id="detailView">
                <div class="detailView-inner">
                    <div id="detailTitle"></div>
                    <div class="default-chart-container">
                        <div id="detailLegend"></div>
                        <div id="detailChart">
<!--                        <div id="stateMap" data-dimensions="ga:longitude,ga:latitude,ga:city" data-metrics="ga:sessions" data-charttype="statemap" data-filter="yes" data-filter-name="ga:region" data-filter-value="Connecticut"></div>-->
                            <div id="stateMap"></div>
                        </div>
                    </div>
                    <div id="detailTable"><table class="table table-striped"><tbody></tbody></table></div>
                </div>
            </div>
            
                
                
<!--
            <div id="advancedView"></div>
            </div>
-->

        </div>






    </section>
<!--
    <div class="scroll-top">
        <div class="scrollup">
            <i class="fa fa-angle-double-up"></i>
        </div>
    </div>
-->
<!--    <script src="assets/js/vendor/jquery-1.11.2.min.js"></script>-->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="crossorigin="anonymous"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
<!--    <script src="assets/js/plugins.js"></script>-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="assets/js/vendor/jquery.mCustomScrollbar.concat.min.js"></script>
    
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsN1LrDBvwq6Xq7hD9XJ2fA0Fn7T4hVuU&libraries=visualization"></script>
    
    <script src="assets/js/plugins/chartist/moment.min.js"></script>
    <script src="assets/js/plugins/chartist/chartist.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/plugins/dashboard.plugin.js"></script>

    <script src="assets/js/dashboard.js"></script>

<!--    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsN1LrDBvwq6Xq7hD9XJ2fA0Fn7T4hVuU&callback=myMap"></script>-->
    
    


</body>

</html>
