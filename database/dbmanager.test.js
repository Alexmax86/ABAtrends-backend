const dbManager = require ('./dbmanager')

test('DB testing for session query: Should return not undefined', async () => {    
    const result = await dbManager.getSessions([1, 2, 3], [1, 2, 3], '2020-08-01', '2026-12-01');
    console.log(result)
    expect(result).not.toBeUndefined();
  });