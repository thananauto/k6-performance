# k6-performance [![CI](https://github.com/thananauto/k6-performance/actions/workflows/main.yml/badge.svg)](https://github.com/thananauto/k6-performance/actions/workflows/main.yml)

## Overview
Code that supports the perfomance and Load testing of the web application and the generation of HTML report

## Prerequisites

In order to run you have to install `k6` Click [here](https://k6.io/docs/get-started/installation/) to install the latest version

 ## Running
 Test can be running using `k6`

 ```k6 run scripts/demoblaze.js```


 ## Application 
 For demo purpose we performed load on [DemoBlaze](http://blazedemo.com') site

 ## Result
 On successfull execution of scripts, the result can be found in `<root>/result/report.html` 




 For every push the script would execute via githubworkflow and the latest result can be found [here](https://thananauto.github.io/k6-performance/result/report.html). In linux box using `grafana\k6` image to execute the test scripts

 In githubworkflow folder, you can find different ways to setup tools and infrastructure to execute the scripts