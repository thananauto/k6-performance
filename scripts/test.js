import http from 'k6/http';
import { sleep } from 'k6';
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import generateXrayJUnitXML from './junitXray.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";




//init method to set the virtual users
export const options ={
    stages :[
        { duration: '15s', target: 8 },
        { duration: '10s', target: 5 },
        { duration: '5s', target: 0 },
    ]
   // vus: 10,
   // duration: '30s'
}

//test function
export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
 
  return {
      'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...
      './result/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
      './result/summary.json': JSON.stringify(data), // and a JSON with all the details...
      "./result/index.html": htmlReport(data),
      //'./xrayJunit.xml': generateXrayJUnitXML(data, 'summary.json', encoding.b64encode(JSON.stringify(data))),
      // And any other JS transformation of the data you can think of,
      // you can write your own JS helpers to transform the summary data however you like!
  }
}
