<?php session_start(); ?>



<div class="container">
    <div class="row row-top">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="grid-wrapper">

                <div class="box item-w-md  heat-chart">
                    <div class="card-wrapper chart-sm">
                        <h4>Country Map</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
                                <div class="chart-options">
                                    <label>Chart Type</label>
                                    <select class="change-chart-view">
                                    <option></option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                        <option value="line">Line</option>
                                </select>
                                </div>
                                <div class="map" id="mapChart" data-dimensions="ga:region,ga:regionIsoCode" data-metrics="ga:sessions" data-charttype="map" data-filter="yes" data-filter-name="ga:country" data-filter-value="US">
                                    <?php include 'maps/map-us.svg'; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="box item-w-md ">
                    <div class="card-wrapper chart-sm">
                        <h4>Country Map</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
                                <div class="chart-options">
                                    <label>Chart Type</label>
                                    <select class="change-chart-view">
                                    <option></option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                        <option value="line">Line</option>
                                </select>
                                </div>
                                <div style="height:100%;width:100%;">
                                    <div id="floating-panel">
                                      <button onclick="toggleHeatmap()">Toggle Heatmap</button>
                                      <button onclick="changeGradient()">Change gradient</button>
                                      <button onclick="changeRadius()">Change radius</button>
                                      <button onclick="changeOpacity()">Change opacity</button>
                                    </div>
                                    
                                    
                                    
                                    <div id="heatMap" data-dimensions="ga:longitude,ga:latitude,ga:city" data-metrics="ga:sessions" data-charttype="heatMap" data-filter="yes" data-filter-name="ga:country" data-filter-value="US"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>










                <!--
                <div class="box item-w-md ">
                    <div class="card-wrapper chart-sm">
                        <h4>Country Map</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
                                <div class="chart-options">
                                    <label>Chart Type</label>
                                    <select class="change-chart-view">
                                    <option></option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                        <option value="line">Line</option>
                                </select>
                                </div>
                                <div style="height:100%;width:100%;">
                                    <div id="countryMap" data-dimensions="ga:longitude,ga:latitude,ga:city" data-metrics="ga:sessions" data-charttype="gMap" data-filter="yes" data-filter="yes" data-filter-name="ga:country" data-filter-value="US"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
-->










                <!--
                <div class="box item-w-md ">
                    <div class="card-wrapper chart-sm">
                        <h4>Country Map</h4>
                        <div class="card shadow">
                            <div class="card-body card-grid">
                                <div class="chart-options">
                                    <label>Chart Type</label>
                                    <select class="change-chart-view">
                                    <option></option>
                                    <option value="bar">Bar</option>
                                    <option value="pie">Pie</option>
                                        <option value="line">Line</option>
                                </select>
                                </div>


                                <div style="height:100%;width:100%;">
                                    
                                    <div id="stateMap" data-dimensions="ga:longitude,ga:latitude,ga:city" data-metrics="ga:sessions" data-charttype="statemap" data-filter="yes" data-filter-name="ga:region" data-filter-value="Connecticut"></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
-->










            </div>



        </div>
    </div>
</div>
