import axios from 'axios';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DOMAIN, log as SysLog, __DEV__ } from 'ultis/functions';

export function request(param) {
  let url = `${DOMAIN}/${param.url}`

  const language = 'vi';
  const parameters = param.param;
  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    "Access-Control-Allow-Origin": true,
    'Accept-Language': language
  }

  if (__DEV__) {
    console.info('Log_header', headers);
  }

  return from(
    axios.request({
      url,
      timeout: 10000,
      headers,
      method: param.method || 'POST',
      data: parameters
    }),
  ).pipe(
    map((result) => {
      return { result: result.data.result, status: result.status };
    }),
    tap((result) => log(url, parameters, result)),
  );
}

function log(url, parameters, result) {
  SysLog(
    '--------------------------\n',
    // '\x1b[34m',
    'Request data:',
    // '\x1b[37m',
    '\nURL:           ',
    // '\x1b[32m',
    url,
    // '\x1b[37m',
    '\nParam:         ',
    // '\x1b[32m',
    JSON.stringify(parameters, null, '\x1b[32m'),
    // '\x1b[37m',
    '\nResponse Data: ',
    // '\x1b[32m',
    JSON.stringify(result, null, '\x1b[32m') || true,
    // '\x1b[37m',
    '\n--------------------------',
  );
}
