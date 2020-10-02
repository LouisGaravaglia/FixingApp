const timeWord = require('./timeWord');

describe('Calling timeWord() to get plain text time as output from military time input', () => {
  test('it will return midnight and noon instead of number values', () => {
    expect(timeWord("00:00")).toEqual('noon');
  });
});