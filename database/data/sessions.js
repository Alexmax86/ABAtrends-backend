const faker = require('faker');

// Function to generate a random date in the last 3 months
function generateRandomDate() {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 3);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate therapy sessions
const therapySessions = [];
for (let i = 0; i < 50; i++) { // You can adjust the number of sessions
  const therapist_id = faker.datatype.number({ min: 1, max: 6 });
  const patient_id = faker.datatype.number({ min: 1, max: 6 });
  const date = generateRandomDate();
  
  // Formatting the date in 'yyyy-mm-dd' format
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  const responses = faker.datatype.number({ min: 1, max: 20 });

  const session = {
    therapist_id,
    patient_id,
    date: formattedDate,
    responses
  };

  therapySessions.push(session);
}

module.exports = therapySessions;




