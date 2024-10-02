import {DataBaseSingleton} from "./connectionSingleton.js"

/*
example usage
results = queryObservations(patientID, {
    subject: patientID,
    category: "vital-signs",
    type: "Body Weight"
})

returns 
[
    {
        date: date,
        value: 68
        unit: kg
    },

]
*/