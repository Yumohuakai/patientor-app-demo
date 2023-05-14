import VaccinesIcon from "@mui/icons-material/Vaccines";
import HealingIcon from "@mui/icons-material/Healing";
import { HospitalEntry } from "../../../../../types";
import DiagnosisList from "./DiagnosisList";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div className="entry">
      <p>
        {entry.date} <VaccinesIcon />{" "}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.diagnosisCodes ? (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      ) : null}
      <p>
        <HealingIcon /> {entry.discharge.date} {entry.discharge.criteria}
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryDetails;
