import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import { AddEntryModalProps } from "../../../../types";
import EntryForm from "./EntryForm";

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: AddEntryModalProps) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}

        <div>
          <EntryForm onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
