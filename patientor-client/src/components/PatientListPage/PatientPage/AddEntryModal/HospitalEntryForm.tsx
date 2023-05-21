import { useState, SyntheticEvent } from "react";
import { HospitalEntryFormProps } from "../../../../types";
import {
  TextField,
  // InputLabel, MenuItem, Select,
  Grid,
  Button,
  // SelectChangeEvent
} from "@mui/material";

const HospitalEntryForm = ({ onCancel, onSubmit }: HospitalEntryFormProps) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const codes =
      diagnosisCodes.trim().length === 0
        ? []
        : diagnosisCodes
            .trim()
            .split(",")
            .map((d) => d.trim());
    onSubmit({
      date,
      specialist,
      description,
      diagnosisCodes: codes,
      discharge: { date: dischargeDate, criteria },
      type: "Hospital",
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Diagnosis Code(s)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="Discharge Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="criteria"
          fullWidth
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
