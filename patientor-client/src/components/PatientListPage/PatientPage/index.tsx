import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Patient, NewEntry } from "../../../types";
import patientService from "../../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import EntryList from "./EntryList";
import { Button, Tooltip } from "@mui/material";
import AddEntryModal from "./AddEntryModal";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const foundPatient = await patientService.getOne(id);
        setPatient(foundPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    if (id) {
      try {
        const updatedPatient = await patientService.addEntry(id, values);
        setPatient(updatedPatient);
        setModalOpen(false);
        setError(undefined);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };
  return (
    <div>
      {patient === undefined ? null : (
        <>
          <h1>
            {patient.name}{" "}
            {patient.gender.toString() === "female" ? (
              <Tooltip
                title={`Gender: ${patient.gender.toString()}`}
                placement="right-start"
              >
                <FemaleIcon />
              </Tooltip>
            ) : null}
            {patient.gender.toString() === "male" ? (
              <Tooltip
                title={`Gender: ${patient.gender.toString()}`}
                placement="right-start"
              >
                <MaleIcon />
              </Tooltip>
            ) : null}
            {patient.gender.toString() === "other" ? (
              <Tooltip
                title={`Gender: ${patient.gender.toString()}`}
                placement="right-start"
              >
                <PanoramaFishEyeIcon />
              </Tooltip>
            ) : null}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
          <EntryList entries={patient.entries} />
        </>
      )}
    </div>
  );
};

export default PatientPage;
