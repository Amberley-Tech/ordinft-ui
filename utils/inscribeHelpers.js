export const SATS_OF_1_BTC = 100000000;

export function isValidBTCAddress(str) {
  let regex = new RegExp(
    /^([13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59})$/
  );

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
}

export function isValidLTCAddress(str) {
  const regex = new RegExp(/^(L|M|3)[A-Za-z0-9]{33}$|^(ltc1)[0-9A-Za-z]{39}$/);

  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
}

export function btcToSats(btc) {
  return +btc * SATS_OF_1_BTC;
}

export function satsToBtc(sats) {
  return +sats / SATS_OF_1_BTC;
}
