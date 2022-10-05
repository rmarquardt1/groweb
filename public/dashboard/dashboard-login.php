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
    <title>Dashboard</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="../assets/images/favicon.ico" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../assets/css/plugins.css" />
    <link rel="stylesheet" href="../assets/css/jquery.mCustomScrollbar.min.css" />
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/responsive.css" />
    <script src="../assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
</head>
<body data-spy="scroll" data-target="#main-navbar">
    <div class='preloader'>
        <div class='loaded'>&nbsp;</div>
    </div>
    <?php $current = 'contact' ?>
    <?php include '../app/header.php' ?>
    <div class="page-title">
        <div class="page-title-overlay"></div>
        <div class="page-title-inner container ">
            <h1>DASHBOARD LOGIN</h1>
        </div>
    </div>
    
    
    
    <section id="contact-area" class="sections">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-1"></div>
                <div class="col-lg-8 col-md-8 col-sm-10 col-xs-12 page-heading">
                    
                    
                    
                    
                    
                    
                    
                    <form method="post" id="loginForm" action="login.php" class="shadow card">
                        <div class="content-loading"></div>
                        
                        
                        
                        
                        <div class="row row-username">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <label>Username</label>
                                <input type="text" name="username" id="username" />
                            </div>
                        </div>
                        
                        <div class="row row-password">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 email">
                                <label>Password</label>
                                <input type="password" name="password" id="password" />
                            </div>
                        </div>
                        
                        
                        <div class="row row-submit">
                            <div class="col-lg-12 text-center">
                                <input type="submit" class="button red-bg" value="Login" id="loginSubmit" name="submit" />
                            </div>
                        </div>
                        
                        
                        
                        
                        
                    </form>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-1"></div>
            </div>
        </div>
    </section>
    <?php include '../app/footer.php' ?>
    <div class="scroll-top">
        <div class="scrollup">
            <i class="fa fa-angle-double-up"></i>
        </div>
    </div>
    <script src="../assets/js/vendor/jquery-1.11.2.min.js"></script>
    <script src="../assets/js/vendor/bootstrap.min.js"></script>
    <script src="../assets/js/plugins.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="../assets/js/vendor/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="../assets/js/main.js"></script>
</body>
</html>