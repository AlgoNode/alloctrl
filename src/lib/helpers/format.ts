
export type AmountFormatOptions = {
  abbreviate?: boolean,
}

/**
 * Format timestamp
 * ==================================================
 */
export function formatTimestamp (timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-US');
}

/**
 * Format an Algo amount (microalgos to algo)
 * ==================================================
 */
export function formatAlgoAmount (amount: number, decimals: number = 6) {
  return formatAssetAmount(amount, decimals);
}

/**
 * Format an asset amount
 * ==================================================
 */
export function formatAssetAmount (amount: number, decimals:number = 0, options: AmountFormatOptions = {}) {
  if (typeof amount !== 'number') return '—';
  
  if (options.abbreviate) {
    const ints = Math.floor(amount / (10 ** decimals));
    return abbreviateNumber(ints);
  }
  
  return formatNumber(amount, decimals)
}
/**
 * Tinify addresses (XXXXXX...XXXXXX)
 * ==================================================
 */
export function tinifyAddress (address: string, amount: number = 5) {
  return `${address.slice(0, amount)}…${address.slice(-amount)}`
}



/**
 * Truncate string (XXXXXX...)
 * ==================================================
 */
 export function truncateString (str: string, len: number = 8) {
  if (!str) return '—';
  if (str.length <= len + 3) return str;
  return `${str.slice(0, len)}…`
}

/**
* Plurify word
* ==================================================
*/
export function plurify(word: string, qty?: number) {
  if (qty === undefined) return word + 's';
  return word + (qty > 1 ? 's' : '');
}


/**
* Helpers
* ==================================================
*/
function abbreviateNumber(num: number) {
  const abbr = [
    { value: 1E9,  symbol: "B" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ];
  for (let i=0; i<abbr.length; i++) {
    if (num >= abbr[i].value) {
      return (num / abbr[i].value).toLocaleString().replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + abbr[i].symbol;
    }
  }
  return num.toLocaleString();
}


function formatNumber(num: number, decimals: number = 0) {
  const ints = Math.floor(num / (10 ** decimals));
  const fractions = (ints > 0
    ? Number(String(num).slice(String(ints).length))
    : num
  ) / (10 ** decimals);
  const minDecimals = fractions.toString().match(/(\.0*d?)/)?.[0].length || 0;
  return  ints
            .toLocaleString() + 
          fractions
            .toLocaleString(undefined, { minimumFractionDigits: minDecimals > 0 ? minDecimals + 1 : 0})
            .replace(/^0/, '');
}