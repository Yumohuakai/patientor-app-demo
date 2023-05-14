import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { OccupationalHealthcareEntry } from "../../../../../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div className="entry">
      {/* <p>OccupationalHealthcareEntryDetails</p> */}
      <p>
        {entry.date} <BusinessCenterIcon /> <i>{entry.employerName}</i>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave ? (
        <p>
          {entry.sickLeave.startDate} ~ {entry.sickLeave.endDate}{" "}
          <MedicationLiquidIcon />
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
