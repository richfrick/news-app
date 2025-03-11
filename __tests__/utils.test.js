const {
  convertTimestampToDate,
  formatTopicsSeedingData,
  createLookup,
  checkExists,
} = require('../db/seeds/utils');

describe('convertTimestampToDate', () => {
  test('returns a new object', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test('converts a created_at property to a date', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test('does not mutate the input', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test('ignores includes any other key-value-pairs in returned object', () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test('returns unchanged object if no created_at property', () => {
    const input = { key: 'value' };
    const result = convertTimestampToDate(input);
    const expected = { key: 'value' };
    expect(result).toEqual(expected);
  });
});

describe('format topic seeding data', () => {
  it('returns a new array', () => {
    const input = [
      {
        description: 'The man, the Mitch, the legend',
        slug: 'mitch',
        img_url: '',
      },
    ];
    const expected = formatTopicsSeedingData(input);
    expect(typeof expected).toBe('object');
  });
  it('does not edit the original input', () => {
    const input = [
      {
        description: 'The man, the Mitch, the legend',
        slug: 'mitch',
        img_url: '',
      },
    ];
    formatTopicsSeedingData(input);
    expect(input).toEqual([
      {
        description: 'The man, the Mitch, the legend',
        slug: 'mitch',
        img_url: '',
      },
    ]);
  });
  it('takes an array of objects and returns a nested array in the order you specify', () => {
    const input = [
      {
        description: 'The man, the Mitch, the legend',
        slug: 'mitch',
        img_url: '',
      },
    ];
    const result = formatTopicsSeedingData(input);
    expect(result).toEqual([['mitch', 'The man, the Mitch, the legend', '']]);
  });
});

describe('create lookup', () => {
  it('returns a new object', () => {
    const input = [
      {
        id: 1,
        topic: 'topic1',
      },
      {
        id: 2,
        topic: 'topic2',
      },
    ];
    const result = createLookup(input, 'topic', 'id');
    expect(result).toBeObject;
    expect(result).not.toBe(input);
  });
  it('original input object is unchanged', () => {
    const input = [
      {
        id: 1,
        topic: 'topic1',
      },
      {
        id: 2,
        topic: 'topic2',
      },
    ];
    createLookup(input, 'topic', 'id');
    expect(input).toEqual([
      {
        id: 1,
        topic: 'topic1',
      },
      {
        id: 2,
        topic: 'topic2',
      },
    ]);
  });
  it('a lookup object is returned containing a key & value shosen by the user', () => {
    const input = [
      {
        id: 1,
        topic: 'topic1',
      },
      {
        id: 2,
        topic: 'topic2',
      },
    ];
    const result = createLookup(input, 'topic', 'id');
    expect(result).toEqual({
      topic1: 1,
      topic2: 2,
    });
  });
  it('returns an object with undefined key/value pair if the key and value do not exist in the input', () => {
    const input = [
      {
        id: 1,
        topic: 'topic1',
      },
      {
        id: 2,
        topic: 'topic2',
      },
    ];
    const result = createLookup(input, 'username', 'address');
    expect(result).toEqual({ undefined: undefined });
  });
});

describe('check exists', () => {
  it.skip('404: returns an error if column value is not found', async () => {
    const {
      status,
      body: { msg },
    } = await checkExists('articles', 'article_id', 99);
    expect(status).toBe(404);
    expect(msg).toEqual('Not Found');
  });
  it.todo('404: returns an error if column is not found');
  it.todo('404: returns an error if table value is not found');
  it.todo('404: returns result from db query when it is successful');
});
