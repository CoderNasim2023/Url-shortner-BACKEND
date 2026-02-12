import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    constant_requests: {
      executor: 'constant-arrival-rate',
      rate: __ENV.RATE ? Number(__ENV.RATE) : 200, // requests per second
      timeUnit: '1s',
      duration: __ENV.DURATION || '30s',
      preAllocatedVUs: 100,
      maxVUs: 500
    }
  },
  thresholds: {
    http_req_duration: ['p95<200', 'p99<1000'],
    'http_req_failed': ['rate<0.01']
  }
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';
const PATH = __ENV.TEST_SHORT_PATH || 'abc123'; // set via env var to a real short path before running

export default function () {
  const res = http.get(`${BASE}/${PATH}`);
  check(res, {
    'status is 200/301/302': (r) => r.status === 200 || r.status === 301 || r.status === 302
  });
  // tiny sleep to allow more even scheduling
  sleep(0.01);
}
