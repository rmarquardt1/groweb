<div id="menubar" class="main-menu">
    <nav class="navbar navbar-default navbar-fixed-top menu-bg nav-no-scroll">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                <a class="navbar-brand" href="index.php"><img src="assets/images/groweb_logo_org.svg" alt="groWeb" /></a>
                <div class="navbar-menu">
                    <ul class="nav navbar-nav">
                        <li <?php if($current == 'home') {echo 'class="active"';} ?>><a href="index.php">Home</a></li>
                        <li <?php if($current == 'templates') {echo 'class="active"';} ?>><a href="templates.php">Templates</a></li>
                        <li <?php if($current == 'hosting') {echo 'class="active"';} ?>><a href="hosting.php">Web Hosting</a></li>
                        <li <?php if($current == 'contact') {echo 'class="active"';} ?>><a href="contact.php">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</div>