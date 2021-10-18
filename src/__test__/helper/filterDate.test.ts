import filterDate from 'helper/filterDate';

const dateTime = new Date('2021-10-10T09:59:12.668Z');

describe('helper/filterDate', () => {
  it('filterDate without time', () => {
    expect(filterDate({ date: dateTime, withTime: false })).toBe('2021/10/10');
  });

  it('filterDate with time', () => {
    expect(filterDate({ date: dateTime, withTime: true })).toBe(
      '2021/10/10 18:59:12'
    );
  });
});
