const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const prettifyBytes = num => {
  const neg = num < 0;
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))

  const unit = UNITS[exponent]
  return (neg ? '-' : '') + num + ' ' + unit
};

module.exports = {
  prettifyBytes,
};