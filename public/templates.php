<!DOCTYPE html>
<html>
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
    <title>groWeb Web Templates</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/plugins.css" />
    <link rel="stylesheet" href="assets/css/jquery.mCustomScrollbar.min.css" />
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css" />
    <script src="assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
</head>
<body data-spy="scroll" data-target="#main-navbar">
    <div class='preloader'>
        <div class='loaded'>&nbsp;</div>
    </div>
    <div id="viewOverlayT"></div>
    <div id="viewOverlayB"></div>
    <div id="viewOverlayL"></div>
    <div id="viewOverlayR"></div>
    <div id="viewBox" class="shadow">
        <div class="viewbox-inner">
            <div id="viewBoxHeader">
                <div id="pages">
                    <div id="pages-select">
                        <div class="flex-inline pages-menu">
                            <div class="pages-button">Page</div>
                            <div class="pages-list">
                                <ul>
                                </ul>
                            </div>
                        </div>
                        <div class="flex-inline pages-menu">
                            <div class="view-button">View</div>
                            <div class="view-list">
                                <ul>
                                    <li data-viewtype="desktop">Desktop</li>
                                    <li data-viewtype="tablet">Tablet</li>
                                    <li data-viewtype="mobile">Mobile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="view-title"></div>
                    <div id="closeView"></div>
                </div>
            </div>
            <div class="template-overlay"></div>
            <iframe id="templateFrame"></iframe>
            <div class="template-title"></div>
            <div class="home-button"></div>
            <div class="screenshot-container"></div>
        </div>
    </div>
    <?php $current = 'templates' ?>
    <?php include 'app/header.php' ?>
    
    <div class="page-title">
        <div class="page-title-overlay"></div>
        <div class="page-title-inner container ">
            <h1>TEMPLATES</h1>
        </div>
    </div>
    
    
    
    
    
    
    
    
    
    
    <section id="templates-area" class="sections">
        <div class="container">
<!--
            <div class="row">
                <div class="col-lg-12 text-center page-heading">
                    <h1>TEMPLATES</h1>
                </div>
            </div>
-->
            <div class="row templates-menu">
                <div id="templateResults">
                    <label>Results per page:</label>
                    <select id="templateCount">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12" selected>12</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div id="templates-prev-next">
                    <ul class="pager">
                        <li class="previous"><a data-page="0" id="prevPage">Previous</a></li>
                        <li>
                            <ul class="pagination" id="pageCount"></ul>
                        </li>
                        <li class="next"><a data-page="2" id="nextPage">Next</a></li>
                    </ul>
                </div>
            </div>
            <div class="row templates-container">
                <div class="row template-row"></div>
            </div>
        </div>
    </section>
    <?php include 'app/footer.php' ?>
    <div class="scroll-top">
        <div class="scrollup">
            <i class="fa fa-angle-double-up"></i>
        </div>
    </div>
    <script src="assets/js/vendor/jquery-1.11.2.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="assets/js/vendor/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/templates.js"></script>
</body>
</html>