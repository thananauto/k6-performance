import http from 'k6/http';
import { sleep, check } from 'k6';
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    stages: [
      { duration: '1m', target: 50 },
      { duration: '30s', target: 50 },
      { duration: '1m', target: 0 },
    ],
    thresholds: {
      http_req_failed: [{threshold:'rate<0.01', abortOnFail: true, delayAbortEval: '10s'},],   // http errors should be less than 1% 
      http_req_duration: [{threshold:'p(90)<500', abortOnFail: true, delayAbortEval: '10s'},], // 90% of requests should be below 500ms
      http_reqs: [{threshold:'rate<100', abortOnFail: true, delayAbortEval: '10s'},] // http_reqs rate should be below 100ms
    },
  };

  export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...');
   
    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...
        './result/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
        './result/summary.json': JSON.stringify(data), // and a JSON with all the details...
        "./result/index.html": htmlReport(data),
       }
  }
  export default function () {
    const BASE_URL = 'http://blazedemo.com';
  
    const reserveParams = new URLSearchParams([
      ['fromPort', 'Paris'],
      ['toPort', 'Buenos+Aires'],
    ]);
    const purchaseParams = new URLSearchParams([
      ['fromPort', 'Paris'],
      ['toPort', 'Buenos+Aires'],
      ['airline', 'Virgin+America'],
      ['flight', '43'],
      ['price', '472.56']
    ]);
  
    let loginReq = {
      method: 'GET',
      url: BASE_URL+'/login',
    };
  
    let reserveReq = {
        method: 'POST',
        url: BASE_URL+'/reserve.php',
        params: {
          reserveParams,
        },
    };
  
    let purchaseReq = {
      method: 'POST',
      url: BASE_URL+'/purchase.php',
      params: {
        purchaseParams,
      },
    };
  
    let responses = http.batch([loginReq, reserveReq, purchaseReq]);
    
    check(responses, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
  }