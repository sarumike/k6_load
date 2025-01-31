import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics'
import { Counter} from 'k6/metrics'

const req1 = new Trend('getBlock');
const req2 = new Trend('systemChain');
const req1_count = new Counter('getBlockCount')
const req2_count = new Counter('systemChainCount')


// in order to run and create an  output file with all txn data use:
// k6 --out json=output.txt run test.js
// then filter the txn details and data into a spreadsheet to draw a graph




export function get_block(url, token){

  
let data = {
  
  'jsonrpc': '2.0',
  'method': 'chain_getBlock',
  'params': [],
  'id': '1',
}

const req = http.post(url, JSON.stringify(data), {
headers: {
  'Content-Type': 'application/json',
  'X-Auth-Token': token,
}
}) ;

sleep(1);

return req;

}


export function system_chain(url, token){

  
  let data = {
    
    'jsonrpc': '2.0',
    'method': 'system_chain',
    'params': [],
    'id': '1',
  }
  
  const req = http.post(url, JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': token,
  }
  }) ;
  
  sleep(1);
  
  return req;
  
  }



export const options = {
    vus: 50,
    //duration: '60s',
    //iterations: 10,
   summaryTimeUnit: 'ms',

   scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '300s', target: 50 },
        { duration: '60s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },

};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.

export default function () {

const baseURL = `http://${__ENV.baseURL}`;  // k6 run -e baseURL=localhost/rpc <script.js>
const xAuth = `${__ENV.xAuth}`; // auth token for service

// run for 10% of the time
if (__VU % 10 ==1){
  const r2 = system_chain(baseURL, xAuth);
  req2.add(r2.timings.duration);
  req2_count.add(1);
}

// run for other 90% of the time
else {
  const r = get_block(baseURL, xAuth);
  req1.add(r.timings.duration);
  req1_count.add(1);
}



  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}