import VaccinesIcon from "@mui/icons-material/Vaccines";
import { Tooltip } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import { HospitalEntry } from "../../../../../types";
import DiagnosisList from "./DiagnosisList";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div className="entry">
      <p>
        {entry.date}{" "}
        <Tooltip title="Hospital Entry" placement="right-start">
          <VaccinesIcon />
        </Tooltip>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.diagnosisCodes ? (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      ) : null}
      {entry.discharge ? (
        <p>
          <Tooltip title="discharge info" placement="top-start">
            <HealingIcon />
          </Tooltip>{" "}
          {entry.discharge.date} {entry.discharge.criteria}
        </p>
      ) : null}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryDetails;
