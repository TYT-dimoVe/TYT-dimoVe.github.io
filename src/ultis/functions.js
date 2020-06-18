export const DOMAIN = 'https://us-central1-dimo-3e6f7.cloudfunctions.net/dimoApi/api'
// export const DOMAIN = 'http://localhost:5001/dimo-3e6f7/us-central1/dimoApi/api'
export const __DEV__ = true;
export const COLOR = {
  primary: '#2E4170'
}

export function log(...arg) {
  if (__DEV__) {
    console.info(
      arg
        .map((i) =>
          ['string', 'number'].indexOf(typeof i) === -1 ? JSON.stringify(i, null, ' ') : i,
        )
        .join(' '),
    );
  }
}

export function formatCurrency(n, separate = '.') {
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
