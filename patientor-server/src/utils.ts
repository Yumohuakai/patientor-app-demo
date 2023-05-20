import {
  Diagnosis,
  Discharge,
  Gender,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const errorMsg = "Incorrect or missing";

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

const parseStringField = (fieldValue: unknown, fieldName: string): string => {
  if (!fieldValue || !isString(fieldValue)) {
    throw new Error(`${errorMsg} ${fieldName} ${fieldValue}`);
  }
  return fieldValue;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const parseDate = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`${errorMsg} date ${param}`);
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error(`${errorMsg} gender ${param}`);
  }
  return param;
};

export const parsePatient = (param: unknown): NewPatient => {
  if (!param || typeof param !== "object") {
    throw new Error(`${errorMsg} Patient data`);
  }

  if (!("name" in param)) throw new Error(`${errorMsg} name`);
  if (!("ssn" in param)) throw new Error(`${errorMsg} ssn`);
  if (!("dateOfBirth" in param)) throw new Error(`${errorMsg} dateOfBirth`);
  if (!("gender" in param)) throw new Error(`${errorMsg} gender`);
  if (!("occupation" in param)) throw new Error(`${errorMsg} occupation`);

  return {
    name: parseStringField(param.name, "name"),
    ssn: parseStringField(param.ssn, "ssn"),
    occupation: parseStringField(param.occupation, "occupation"),
    dateOfBirth: parseDate(param.dateOfBirth),
    gender: parseGender(param.gender),
    entries: [],
  };
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const parseHealthCheckRating = (param: unknown): 0 | 1 | 2 | 3 => {
  if (
    isNumber(param) &&
    (param === 0 || param === 1 || param === 2 || param === 3)
  ) {
    return param;
  }
  throw new Error(`${errorMsg} healthCheckRating ${param}`);
};

const parseDiagnosisCodes = (param: unknown): Array<Diagnosis["code"]> => {
  if (!param || typeof param !== "object" || !("diagnosisCodes" in param)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return param.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (param: unknown): Discharge | undefined => {
  if (!param || typeof param !== "object" || !("discharge" in param)) {
    return undefined;
  }

  const discharge = param.discharge;

  if (!discharge || typeof discharge !== "object") {
    throw new Error(`${errorMsg} discharge ${discharge}`);
  }

  if (
    !("date" in discharge) ||
    !isString(discharge.date) ||
    !isDate(discharge.date)
  ) {
    throw new Error(`${errorMsg} discharge date ${discharge}`);
  }

  if (!("criteria" in discharge) || !isString(discharge.criteria)) {
    throw new Error(`${errorMsg} discharge criteria ${discharge}`);
  }

  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

const parseSickLeave = (param: unknown): SickLeave | undefined => {
  if (!param || typeof param !== "object" || !("sickLeave" in param)) {
    return undefined;
  }

  const sickLeave = param.sickLeave;

  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error(`${errorMsg} sickLeave ${sickLeave}`);
  }

  if (
    !("startDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate)
  ) {
    throw new Error(`${errorMsg} sickLeave startDate ${sickLeave}`);
  }

  if (
    !("endDate" in sickLeave) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error(`${errorMsg} sickLeave endDate ${sickLeave}`);
  }

  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

export const parseEntry = (param: unknown): NewEntry => {
  if (!param || typeof param !== "object") {
    throw new Error(`${errorMsg} Entry data`);
  }

  if (!("type" in param)) throw new Error(`${errorMsg} type`);
  if (!("description" in param)) throw new Error(`${errorMsg} description`);
  if (!("date" in param)) throw new Error(`${errorMsg} date`);
  if (!("specialist" in param)) throw new Error(`${errorMsg} specialist`);

  const baseEntry = {
    description: parseStringField(param.description, "description"),
    date: parseDate(param.date),
    specialist: parseStringField(param.specialist, "specialist"),
    parseDiagnosisCodes: parseDiagnosisCodes(param),
  };

  if (param.type === "HealthCheck") {
    if (!("healthCheckRating" in param))
      throw new Error(`${errorMsg} healthCheckRating`);
    return {
      ...baseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(param.healthCheckRating),
    };
  } else if (param.type === "Hospital") {
    return { ...baseEntry, type: "Hospital", discharge: parseDischarge(param) };
  } else if (param.type === "OccupationalHealthcare") {
    if (!("employerName" in param)) throw new Error(`${errorMsg} employerName`);
    return {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseStringField(param.employerName, "employerName"),
      sickLeave: parseSickLeave(param),
    };
  }

  throw new Error(`${errorMsg} type ${param.type}`);
};
