const dbManager = require ('./dbmanager')

test('DB testing for session query: Should not return empty array', async () => {    
  const returnValue = await dbManager.getSessions([1, 2, 3], [1, 2, 3], 1, '2020-08-01', '2026-12-01');
  expect(returnValue).not.toEqual([]);
  });

test('Testing if FK constraints work: should return error', async () => {
  let errorOccurred = false;

  try {
      await dbManager.insertRecord({
          patient_id: 234,
          therapist_id: 234,
          training_type_id: 100,
          date: '2020-08-01',
          responses: 100,
      });
  } catch (error) {
      errorOccurred = true;
  }
  expect(errorOccurred).toBe(true);
});