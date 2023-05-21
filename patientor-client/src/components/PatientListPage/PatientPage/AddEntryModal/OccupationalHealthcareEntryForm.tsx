import { useState, SyntheticEvent } from "react";
import { OccupationalHealthcareEntryFormProps } from "../../../../types";
import { TextField, Grid, Button } from "@mui/material";

const OccupationalHealthcareEntryForm = ({
  onCancel,
  onSubmit,
}: OccupationalHealthcareEntryFormProps) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      employerName,
      sickLeave: { startDate, endDate },
      type: "OccupationalHealthcare",
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
          label="employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Sick leave start date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          label="Sick leave end date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
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

export default OccupationalHealthcareEntryForm;
