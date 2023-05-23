import { Theme } from "@mui/material/styles";

import {
  HealthCheckRatingOption,
  HealthCheckRating,
  EntryType,
  EntryTypeOption,
} from "../../../../types";

export const values = Object.values(HealthCheckRating).filter(
  (v) => !isNaN(Number(v))
);

export const healthCheckRatingOptions: HealthCheckRatingOption[] =
  Object.values(values).map((h) => ({
    value: Number(h),
    label: HealthCheckRating[Number(h)],
  }));

export const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const getStyles = (
  code: string,
  diagnosisCodes: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      diagnosisCodes.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};
