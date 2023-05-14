import { useState, useEffect } from "react";
import { Diagnosis } from "../../../../../types";
import dianosisService from "../../../../../services/diagnoses";

const DiagnosisList = ({
  diagnosisCodes,
}: {
  diagnosisCodes: Array<Diagnosis["code"]>;
}) => {
  console.log("------diagnosisCodes: ", diagnosisCodes);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchDiagnoses = await dianosisService.getAll();
      setDiagnoses(fetchDiagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string): string => {
    if (code.length !== 0) {
      const result = diagnoses.find((d) => d.code === code);
      if (result) {
        return result.name;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <div>
      <ul>
        {diagnosisCodes.map((c) => (
          <li key={c}>
            {c} {getDiagnosisName(c)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisList;
