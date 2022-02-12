import { getDateRange } from './getDateRange';

describe('getDateRange Test Suite', () => {
  function getStringDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
  test('It should return 07 feb 2022 and 11 feb 2022', () => {
    const feb07 = new Date('2022-02-07');
    const feb11 = new Date('2022-02-11');

    const expectedStart = getStringDate(feb07);
    const expectedEnd = getStringDate(feb11);

    const [start, end] = getDateRange(feb07, 4);

    expect(getStringDate(start)).toBe(expectedStart);
    expect(getStringDate(end)).toBe(expectedEnd);
  });

  test('It should return 07 feb 2022 and 07 feb 2022', () => {
    const feb07 = new Date('2022-02-07');
    const expected = getStringDate(feb07);

    const [start, end] = getDateRange(feb07, 0);

    expect(getStringDate(start)).toBe(expected);
    expect(getStringDate(end)).toBe(expected);
  });

  test('It should return 05 feb 2022 and 07 feb 2022', () => {
    const feb07 = new Date('2022-02-07');
    const feb05 = new Date('2022-02-05');

    const expectedStart = getStringDate(feb05);
    const expectedEnd = getStringDate(feb07);

    const [start, end] = getDateRange(feb07, -2);

    expect(getStringDate(start)).toBe(expectedStart);
    expect(getStringDate(end)).toBe(expectedEnd);
  });
});
