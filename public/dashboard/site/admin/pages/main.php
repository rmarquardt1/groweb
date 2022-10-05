<?php session_start(); ?>



<div class="container">
    <div class="row row-top">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="grid-wrapper">

                <!--
                <div class="box item-w-md">
                    <div class="card-wrapper chart-sm">
                        <h4>Page Views</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
                                <div class="chart-options">
                                    <label>Chart Type</label>
                                    <select class="change-chart-view">
                                    <option></option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                </select>
                                </div>
                                <div class="spacer-20"></div>
                                <div class="view-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
-->










                <div class="box item-w-md default-chart">
                    <div class="card-wrapper chart-sm">
                        <h4>Page Views</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
<!--                                <h4>Page Views</h4>-->
                                <div class="chart-options">
                                    <div class="chart-type">
                                        <i class="fas fa-chart-pie"></i>
                                        <i class="fas fa-chart-line"></i>
                                        <i class="fas fa-chart-bar"></i>
                                        <i class="fas fa-chart-area active"></i>
                                    </div>
                                </div>
                                
                                
                                
                                <div id="sessionsChart" class="chart-container" data-dimensions="ga:date" data-metrics="ga:sessions" data-charttype="line" data-datatype="time" data-datestart="7daysAgo" data-dateend="today"></div>
<!--                                <div id="sessionsLegend" class="legend"></div>-->
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
                
                <div class="box item-w-sm item-h-md default-chart">
                    <div class="card-wrapper chart-sm">
                        <h4>Gauges</h4>
                        <div class="card shadow">
<!--                            <div class="card-body main-gauge card-grid">-->
                            <div class="card-body" style="display:flex;flex-wrap:wrap;align-items:stretch;align-content:stretch;">
<!--                                <h4>Gauges</h4>-->
                                <div class="chart-options" style="height:50px;">
                                    <div class="chart-type">

                                        <i class="fas fa-chart-pie"></i>
                                        <i class="fas fa-chart-line"></i>
                                        <i class="fas fa-chart-bar"></i>
                                        <i class="fas fa-chart-area active"></i>

                                    </div>
                                </div>
<!--
                                Users
                                <div id="userGauge" class="chart-container" style="min-height:20%;" data-dimensions="ga:date" data-metrics="ga:users" data-charttype="gauge" data-datatype="time" data-datestart="14daysAgo" data-dateend="today"></div>
-->
                                Sessions
                                <div id="sessionsGauge" class="chart-container" style="min-height:20%;" data-dimensions="ga:date" data-metrics="ga:sessions" data-charttype="gauge" data-datatype="time" data-datestart="14daysAgo" data-dateend="today"></div>
                                Bounce
                                <div id="bounceGauge" class="chart-container" style="min-height:20%;" data-dimensions="ga:date" data-metrics="ga:bounceRate" data-charttype="gauge" data-datatype="time" data-datestart="14daysAgo" data-dateend="today"></div>
                                Session Duration
                                <div id="sessionDurationGauge" class="chart-container" style="min-height:20%;" data-dimensions="ga:date" data-metrics="ga:avgSessionDuration" data-charttype="gauge" data-datatype="time" data-datestart="14daysAgo" data-dateend="today"></div>
                                
                                
                                
                                
                                
                                
                                
                                
                                <div id="sessionsLegend" class="legend"></div>
                            </div>
                        </div>
                    </div>
                </div>












                <?php include 'favorites.php'; ?>



            </div>



        </div>
    </div>
</div>
