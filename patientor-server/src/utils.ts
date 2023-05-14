import {
  Gender,
  NewPatient,
  // Diagnosis
} from "./types";

const errorMsg = "Incorrect or missing";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringField = (objField: unknown, fieldName: string): string => {
  if (!objField || !isString(objField)) {
    throw new Error(`${errorMsg} ${fieldName}`);
  }
  return objField;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`${errorMsg} the date of birth ${date}`);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`${errorMsg} gender ${gender}`);
  }
  console.log("-----parseGender------gender: ", typeof gender, gender);
  return gender;
};

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
//   if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<Diagnosis["code"]>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis["code"]>;
// };

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error(`${errorMsg} data`);
  }

  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatient = {
      name: parseStringField(object.name, "name"),
      ssn: parseStringField(object.ssn, "ssn"),
      occupation: parseStringField(object.occupation, "occupation"),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      entries: [],
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

// const toNewEntry

export default toNewPatient;
