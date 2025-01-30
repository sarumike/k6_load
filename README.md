# k6_load
template setup for K6 load testing

A simple  setup in how to script for K6 load  testing.
3 scripts  for 3 different scenario types:

- **constant load test**
- **stress test**
- **ramp test**

Shows how to create counters and timings  for  2 rpc methods.

The url is taken from the command line option ie:

k6 run **-e baseURL=localhost/rpc** <script.js>


If real time data is required use the following format:

k6 run **--out json=output.txt** -e baseURL=localhost/rpc <script.js>

This option will create a data file output.txt with all the requests sent  in the test for processing.




