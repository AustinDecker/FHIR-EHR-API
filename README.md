# FHIR EHR Rest API

## Description:
This is a demo rest api that provides endpoints for FHIR patient data. The underlying database is mongodb. This was created for linking up my mock FHIR patient data to Grafana, a visualizations front-end which is database agnostic. The goal is to display key patient data in a way that is easily visualizable.

## Endpoints:
### Patients
`GET host:8080/patients/`
*Gets All Patient documents*

`GET host:8080/patients/:patient_id`
*Gets the specified patient with the id*

`POST host:8080/patients/search`
*gets a list of patients matching the values in the object that was sent.*
