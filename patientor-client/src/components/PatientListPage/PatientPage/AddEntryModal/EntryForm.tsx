import { useState, SyntheticEvent, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  HealthCheckRating,
  DiagnosisCodeOption,
  Diagnosis,
  EntryType,
  EntryFormProps,
} from "../../../../types";

import dianosisService from "../../../../services/diagnoses";
import {
  values,
  healthCheckRatingOptions,
  entryTypeOptions,
  MenuProps,
  getStyles,
} from "./formConfig";

const EntryForm = ({ onCancel, onSubmit }: EntryFormProps) => {
  const theme = useTheme();
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

  // extra field for HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  // extra field for Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  // extra field for OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchDiagnoses = await dianosisService.getAll();
      setDiagnoses(fetchDiagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const diagnosisCodeOptions: DiagnosisCodeOption[] = diagnoses.map((d) => ({
    value: d.code,
    label: `${d.code} - ${d.name}`,
  }));

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (e) => e.toString() === value
      );
      if (entryType) {
        setEntryType(entryType);
      }
    }
  };

  const onHealthCheckRatingChange = (
    event: SelectChangeEvent<HealthCheckRating>
  ) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRating = values.find((h) => Number(h) === value);
      if (healthCheckRating) {
        setHealthCheckRating(Number(healthCheckRating));
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryType === "HealthCheck")
      onSubmit({
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating,
        type: "HealthCheck",
      });

    if (entryType === "Hospital") {
      if (!dischargeDate && !criteria) {
        onSubmit({
          date,
          specialist,
          description,
          diagnosisCodes,
          type: "Hospital",
        });
      } else {
        onSubmit({
          date,
          specialist,
          description,
          diagnosisCodes,
          discharge: { date: dischargeDate, criteria },
          type: "Hospital",
        });
      }
    }

    if (entryType === "OccupationalHealthcare")
      onSubmit({
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName,
        sickLeave: { startDate, endDate },
        type: "OccupationalHealthcare",
      });
  };

  const extraFieldsForHealthCheck = () => (
    <>
      <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
      <Select
        label="HealthCheckRating"
        fullWidth
        value={healthCheckRating}
        onChange={onHealthCheckRatingChange}
      >
        {healthCheckRatingOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );

  const extraFieldsForHospital = () => (
    <>
      <InputLabel style={{ marginTop: 15 }}>Discharge Date</InputLabel>
      <TextField
        type="date"
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
    </>
  );

  const extraFieldsForOccupationalHealthcare = () => (
    <>
      <TextField
        label="employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel style={{ marginTop: 15 }}>Sick leave start date</InputLabel>
      <TextField
        type="date"
        fullWidth
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <InputLabel style={{ marginTop: 15 }}>Sick leave end date</InputLabel>
      <TextField
        type="date"
        fullWidth
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </>
  );
  return (
    <div>
      <InputLabel style={{ marginTop: 5 }}>Entry Type</InputLabel>
      <Select
        label="Gender"
        fullWidth
        value={entryType}
        onChange={onEntryTypeChange}
      >
        {entryTypeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 15 }}>Date</InputLabel>
        <TextField
          type="date"
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
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Code(s)</InputLabel>
        <Select
          label="DiagnosisCodes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodeChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnosisCodeOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={getStyles(option.value, diagnosisCodes, theme)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {entryType === "HealthCheck" ? extraFieldsForHealthCheck() : null}
        {entryType === "Hospital" ? extraFieldsForHospital() : null}
        {entryType === "OccupationalHealthcare"
          ? extraFieldsForOccupationalHealthcare()
          : null}

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

export default EntryForm;
