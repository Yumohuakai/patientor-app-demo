import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../../../types";
import patientService from "../../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryList from "./EntryList";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const foundPatient = await patientService.getOne(id);
        setPatient(foundPatient);
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
        </>
      )}
    </div>
  );
};

export default PatientPage;
