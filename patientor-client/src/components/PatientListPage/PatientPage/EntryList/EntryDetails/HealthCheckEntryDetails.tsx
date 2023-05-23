import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink, yellow, green, orange } from "@mui/material/colors";
import { HealthCheckRating, HealthCheckEntry } from "../../../../../types";
import { SvgIconProps, Tooltip } from "@mui/material";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const getHealthCheckRatingIcon = (
    rating: HealthCheckRating
  ): React.ReactElement<SvgIconProps> | null => {
    switch (rating) {
      case 0:
        return (
          <Tooltip title="Health check rate: Healthy" placement="right-start">
            <FavoriteIcon sx={{ color: green[500] }} />
          </Tooltip>
        );
      case 1:
        return (
          <Tooltip title="Health check rate: Low Risk" placement="right-start">
            <FavoriteIcon sx={{ color: yellow[500] }} />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip title="Health check rate: High Risk" placement="right-start">
            <FavoriteIcon sx={{ color: orange[500] }} />
          </Tooltip>
        );
      case 3:
        return (
          <Tooltip
            title="Health check rate: Critical Risk"
            placement="right-start"
          >
            <FavoriteIcon sx={{ color: pink[500] }} />
          </Tooltip>
        );
    }
    return null;
  };

  return (
    <div className="entry">
      <p>
        {entry.date}{" "}
        <Tooltip title="Health Check Entry" placement="right-start">
          <MedicalInformationIcon />
        </Tooltip>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p> {getHealthCheckRatingIcon(entry.healthCheckRating)}</p>
      {entry.diagnosisCodes ? (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      ) : null}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryDetails;
