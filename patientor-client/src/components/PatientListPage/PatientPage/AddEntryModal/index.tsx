import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import EntryForm from "./EntryForm";
import { AddEntryModalProps } from "../../../../types";

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: AddEntryModalProps) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <EntryForm onSubmit={onSubmit} onCancel={onClose} />
      {/* <EntryForm /> */}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
