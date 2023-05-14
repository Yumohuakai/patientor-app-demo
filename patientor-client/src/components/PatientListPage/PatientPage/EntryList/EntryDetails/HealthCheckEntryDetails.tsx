import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink, yellow, green, orange } from "@mui/material/colors";
import { HealthCheckRating, HealthCheckEntry } from "../../../../../types";
import { SvgIconProps } from "@mui/material";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  //   console.log("------entry: ", entry.healthCheckRating);

  const getHealthCheckRatingIcon = (
    rating: HealthCheckRating
  ): React.ReactElement<SvgIconProps> | null => {
    switch (rating) {
      case 0:
        return <FavoriteIcon sx={{ color: green[500] }} />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: orange[500] }} />;
      case 3:
        return <FavoriteIcon sx={{ color: pink[500] }} />;
    }
    return null;
  };

  return (
    <div className="entry">
      {/* <p>HealthCheckEntryDetails</p> */}
      <p>
        {entry.date} <MedicalInformationIcon />
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
