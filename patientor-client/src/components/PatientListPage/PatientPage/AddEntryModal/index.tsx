import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import {
  AddEntryModalProps,
  EntryType,
  EntryTypeOption,
} from "../../../../types";

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: AddEntryModalProps) => {
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

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

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}

        <div>
          <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
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
          {entryType === "HealthCheck" ? (
            <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
          ) : null}
          {entryType === "Hospital" ? (
            <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          ) : null}
          {entryType === "OccupationalHealthcare" ? (
            <OccupationalHealthcareEntryForm
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
