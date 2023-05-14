import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Patient,
  // Diagnosis
} from "../../../types";
import patientService from "../../../services/patients";
// import dianosisService from "../../../services/diagnoses";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryList from "./EntryList";

const PatientPage = () => {
  const id = useParams().id;
  //   console.log("---typeof--id: ", typeof id);
  //   console.log("-----id: ", id);
  const [patient, setPatient] = useState<Patient>();
  // console.log("-----patient: ", patient);

  // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  // console.log("-----diagnoses: ", diagnoses);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const foundPatient = await patientService.getOne(id);
        setPatient(foundPatient);
        // const fetchDiagnoses = await dianosisService.getAll();
        // setDiagnoses(fetchDiagnoses);
      }
    };
    void fetchPatient();
  }, [id]);

  return (
    <div>
      {patient === undefined ? null : (
        <>
          <h1>
            {patient.name}{" "}
            {patient.gender.toString() === "female" ? (
              <FemaleIcon />
            ) : (
              <MaleIcon />
            )}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <EntryList entries={patient.entries} />
          {/* {patient.entries.length !== 0 ? <h3>entries</h3> : null}
          {patient.entries.map((e) => (
            <div key={e.id}>
              <p>
                {e.date} {e.description}
              </p>
              {e.diagnosisCodes ? (
                <ul>
                  {e.diagnosisCodes.map((d) => (
                    <li key={d}>
                      {d}{" "}
                      {diagnoses.find((dia) => dia.code === d)
                        ? diagnoses.find((dia) => dia.code === d)?.name
                        : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))} */}
        </>
      )}
    </div>
  );
};

export default PatientPage;
