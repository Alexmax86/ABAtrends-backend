const dbManager = require ('./dbmanager')

test('DB testing for session query: Should not return empty array', async () => {    
  const returnValue = await dbManager.getSessions([1, 2, 3], [1, 2, 3], 1, '2020-08-01', '2026-12-01');
  expect(returnValue).not.toEqual([]); 
  
  console.log(returnValue);    
   
  });