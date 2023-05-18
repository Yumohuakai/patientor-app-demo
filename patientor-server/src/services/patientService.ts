import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient, NewEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitivePatientEntry = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (patient) {
    const newEntry = {
      id: uuid(),
      ...entry,
    };

    patient.entries = patient.entries.concat(newEntry);
    console.log(newEntry);
  }
  return patient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntry,
  getOnePatient,
  addPatient,
  addEntry,
};
