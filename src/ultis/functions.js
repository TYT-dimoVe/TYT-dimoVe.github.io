export const DOMAIN = 'https://us-central1-dimo-3e6f7.cloudfunctions.net/dimoApi/api'
export const __DEV__ = true;

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
