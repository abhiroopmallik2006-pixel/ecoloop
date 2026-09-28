/** Exact three-decimal arithmetic for controlled nonnegative quantities. */
export function toMilli(value: string): bigint {
  if (!/^\d+(\.\d{1,3})?$/.test(value)) throw new Error('Expected a nonnegative decimal with at most three places.');
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
}
export function sumQuantities(values: readonly string[]): string {
  const total = values.reduce((sum, value) => sum + toMilli(value), 0n);
  return `${total / 1000n}.${(total % 1000n).toString().padStart(3, '0')}`;
}
export function csvCell(value: string): string {
  const safe = /^[\s]*[=+@-]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
