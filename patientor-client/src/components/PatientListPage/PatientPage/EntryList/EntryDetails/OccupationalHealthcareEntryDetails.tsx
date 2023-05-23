import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { Tooltip } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../../../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div className="entry">
      <p>
        {entry.date}{" "}
        <Tooltip title="Occupational Healthcare Entry" placement="top-start">
          <BusinessCenterIcon />
        </Tooltip>{" "}
        <Tooltip title="Employer Name" placement="right-start">
          <i>{entry.employerName}</i>
        </Tooltip>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave ? (
        <p>
          {entry.sickLeave.startDate} ~ {entry.sickLeave.endDate}{" "}
          <Tooltip title="Sick Leave Day(s)" placement="right-start">
            <MedicationLiquidIcon />
          </Tooltip>
        </p>
      ) : null}
      {entry.diagnosisCodes ? (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      ) : null}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
