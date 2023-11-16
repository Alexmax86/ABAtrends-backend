SELECT Sessions.date,
Patients.id as patient_id,
Therapists.id as therapist_id, 
Patients.name || ' ' || Patients.surname AS Patient_name, 
Therapists.name || ' ' || Therapists.surname AS Therapist_name,
Sessions.responses
FROM Sessions
INNER JOIN Patients ON Patients.id = Sessions.patient_id
INNER JOIN Therapists ON Therapists.id = Sessions.therapist_id
WHERE Sessions.patient_id IN (1, 2, 3)
  AND Sessions.therapist_id IN (1, 2, 3)
  AND Sessions.date BETWEEN '2020-01-01' AND '2023-01-01'      
ORDER BY Sessions.date;