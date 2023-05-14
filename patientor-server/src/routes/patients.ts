import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientService.getPatientEntries();
  // const data = patientService.getNonSensitivePatientEntry();
  // console.log("-------data: ", data);
  res.send(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = patientService.getOnePatient(id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(400).send("Patient is not exist!");
  }
});

router.post("/", (req, res) => {
  // add new data without safe parsing, validation and type predicate
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const addEntry = patientService.addPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation,
  // });
  // res.json(addEntry);

  // add new data with safe parsing, validation and type predicate
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
