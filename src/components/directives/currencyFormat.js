export function currencyFormat(amount) {
  const tempAmountFormat = parseFloat(amount || '0');
  return tempAmountFormat.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });
}
