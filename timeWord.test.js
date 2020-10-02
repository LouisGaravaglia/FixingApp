const timeWord = require('./timeWord');

describe('Calling timeWord() to get plain text time as output from military time input', () => {

  test('it will return midnight and noon instead of number values', () => {
    expect(timeWord("00:00")).toEqual('midnight');
    expect(timeWord("12:00")).toEqual('noon');
  });

  test('it will return times with "am" at the end for anything prior to 12:00', () => {
    expect(timeWord("00:12")).toEqual('twelve twelve am');
    expect(timeWord("01:00")).toEqual("one o'clock am");
    expect(timeWord("06:01")).toEqual('six oh one am');
    expect(timeWord("06:10")).toEqual('six ten am');
    expect(timeWord("06:18")).toEqual('six eighteen am');
    expect(timeWord("06:30")).toEqual('six thirty am');
    expect(timeWord("10:34")).toEqual('ten thirty four am');
    expect(timeWord("11:59")).toEqual('eleven fifty nine am');
  });

  test('it will return times with "pm" at the end for anything after to 12:00', () => {
    expect(timeWord("12:09")).toEqual('twelve oh nine pm');
    expect(timeWord("23:23")).toEqual('eleven twenty three pm');
    expect(timeWord("14:01")).toEqual('two oh one pm');
    expect(timeWord("14:00")).toEqual("two o'clock pm");
    expect(timeWord("21:10")).toEqual('nine ten pm');
    expect(timeWord("19:18")).toEqual('seven eighteen pm');
    expect(timeWord("13:30")).toEqual('one thirty pm');
    expect(timeWord("15:34")).toEqual('three thirty four pm');
    expect(timeWord("22:59")).toEqual('ten fifty nine pm');
  });
  
});
