import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientService.getPatientEntries();
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
