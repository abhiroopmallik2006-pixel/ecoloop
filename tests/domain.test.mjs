import test from 'node:test';
import assert from 'node:assert/strict';
import { sumQuantities, toMilli, csvCell } from '../packages/domain/src/quantities.ts';

test('decimal quantities sum exactly without binary rounding', () => {
  assert.equal(sumQuantities(['0.100','0.200']), '0.300');
  assert.equal(sumQuantities(['27.5','24','23.5','20','19.5','18','16']), '148.500');
  assert.equal(sumQuantities(['999999999999.999','0.001']), '1000000000000.000');
});
test('invalid, negative, nonfinite and excess precision quantities are rejected', () => {
  for (const input of ['-1','NaN','Infinity','1e3','0.0001','','1,000',' 12']) assert.throws(()=>toMilli(input));
});
test('CSV cells escape formulas, leading whitespace, quotes and line breaks', () => {
  assert.equal(csvCell('=1+1'), '"\'=1+1"');
  assert.equal(csvCell('  @SUM(A1)'), '"\'  @SUM(A1)"');
  assert.equal(csvCell('A "quoted"\nname'), '"A ""quoted""\nname"');
  assert.equal(csvCell('12.500'), '"12.500"');
});
