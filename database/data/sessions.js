/*SESSIONS SCHEMA
therapist_id
patient_id
training_id
date
responses
*/


const therapySessions = generateSessionData()

function generateSessionData(){
    let therapySessions = []
    //Generation cycle for each patient
    for (let patientId = 1; patientId < 7; patientId++){
        
        //Establish generation range within the last year
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 12);
        

        //Generation cycle for each training type
        for (let trainingId= 1; trainingId < 6; trainingId++){
            //Each patient has a learning coefficient for each kind of training
            let learningCoefficient =  Math.random()
            //Initial score between 0 and 5
            let scorePointer = genRandNumber(0, 5)
            
            //Initialize a moving date pointer that will be used through the data generation
            //Set date pointer to initial date of the generation range
            const datePointer = new Date()            
            datePointer.setDate(startDate.getDate())
            datePointer.setMonth(startDate.getMonth())
            datePointer.setFullYear(startDate.getFullYear())

            //As long as date pointer is behind the end date....
            while (datePointer <= endDate){
                //Generate new score based on the learning coefficient but clamp it to a max of 20
                let newScore = scorePointer + step(learningCoefficient)
                scorePointer = clamp(newScore, 0, 20)
                //Format date pointer into SQL date format
                const formattedDate = `${datePointer.getFullYear()}-${(datePointer.getMonth() + 1).toString().padStart(2, '0')}-${datePointer.getDate().toString().padStart(2, '0')}`;
                //Create session object to be inserted in DB
                const session = {
                    therapist_id : genRandNumber(1, 6),
                    patient_id: patientId,
                    date: formattedDate,
                    training_type_id: trainingId,
                    responses: scorePointer
                }
                //Increase date pointer randomly by 1-7 days
                datePointer.setDate(datePointer.getDate() + genRandNumber(1, 7))
                //Push session object into the array
                therapySessions.push(session)
            }
        }
    }
    //Return populated array to be inserted into DB
    return therapySessions
}


function genRandNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function step(learningCoefficient){
    const randomNumber = Math.random();
    let generatedNumber;

    if (randomNumber < learningCoefficient) {
        // Higher probability for positive numbers
        generatedNumber = Math.floor(Math.random() * 4)
    } else {
        // Lower probability for negative numbers
        generatedNumber = Math.floor(Math.random() * 3) - 2;
    }

    return generatedNumber;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  module.exports = therapySessions;
