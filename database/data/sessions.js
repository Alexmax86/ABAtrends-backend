/*SESSIONS SCHEMA
therapist_id
patient_id
training_id
date
responses
*/

let therapySessions = generatePatientData()


function generatePatientData(){
    let therapySessions = []
    //Generation cycle for each patient
    for (let patientId = 1; patientId < 7; patientId++){
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 12);

        

        //Generation cycle for each training type
        for (let trainingId= 1; trainingId < 6; trainingId++){
            
            let scorePointer = genRandNumber(0, 5)
            let learningCoefficient =  Math.random()

            const datePointer = new Date()
            const debug = startDate.getDate()
            datePointer.setDate(startDate.getDate())
            datePointer.setMonth(startDate.getMonth())
            datePointer.setFullYear(startDate.getFullYear())

            while (datePointer <= endDate){
                let newScore = scorePointer + step(learningCoefficient)
                scorePointer = clamp(newScore, 0, 20)
                const formattedDate = `${datePointer.getFullYear()}-${(datePointer.getMonth() + 1).toString().padStart(2, '0')}-${datePointer.getDate().toString().padStart(2, '0')}`;
                const session = {
                    therapist_id : genRandNumber(1, 6),
                    patient_id: patientId,
                    date: formattedDate,
                    training_type_id: trainingId,
                    responses: scorePointer
                }

                

                

                datePointer.setDate(datePointer.getDate() + genRandNumber(1, 7))
                therapySessions.push(session)
            }

        }


    }

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
