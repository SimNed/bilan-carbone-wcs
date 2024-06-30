import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { useMemo } from "react";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/styles/constants";
import {
  StatsDetailsTableColumn,
  StatsDetailsTable,
} from "@/styles/mui-classes";
import {
  getNumberFormatedToTwoDecimals,
  getPercentage,
} from "@/utils/maths.utils";

const WorldStatsDetailsTable = ({
  carboneEmissions,
  selectedYear,
}: {
  carboneEmissions: CarboneEmissionData[];
  selectedYear: number;
}) => {
  const selectedCarboneEmissionIndex = useMemo(
    () => carboneEmissions.findIndex((data) => data.year === selectedYear),
    [selectedYear, carboneEmissions]
  );

  const carboneEmissionsPreviousYearDifferencePercentage = useMemo(
    () =>
      getPercentage(
        carboneEmissions[selectedCarboneEmissionIndex]
          ?.carboneEmissionsPerCapita,
        carboneEmissions[selectedCarboneEmissionIndex - 1]
          ?.carboneEmissionsPerCapita
      ),
    [selectedCarboneEmissionIndex]
  );

  const carboneEmissionsNextYearDifferencePercentage = useMemo(
    () =>
      getPercentage(
        carboneEmissions[selectedCarboneEmissionIndex]
          ?.carboneEmissionsPerCapita,
        carboneEmissions[selectedCarboneEmissionIndex + 1]
          ?.carboneEmissionsPerCapita
      ),
    [selectedCarboneEmissionIndex]
  );

  return (
    <StatsDetailsTable>
      <StatsDetailsTableColumn>
        <Stack>
          <Typography variant="h6">Co2 t. PER CAPITA</Typography>
        </Stack>
        <Stack>
          <Typography variant="h5">
            {getNumberFormatedToTwoDecimals(
              carboneEmissions[selectedCarboneEmissionIndex]
                ?.carboneEmissionsPerCapita
            )}
          </Typography>
        </Stack>
      </StatsDetailsTableColumn>

      {selectedCarboneEmissionIndex > 0 && (
        <StatsDetailsTableColumn>
          <Stack>
            <Typography variant="h6">
              {`${carboneEmissions[selectedCarboneEmissionIndex - 1]?.year}`}
            </Typography>
            {carboneEmissionsPreviousYearDifferencePercentage > 0 ? (
              <NorthEastIcon sx={{ color: ERROR_COLOR }} />
            ) : (
              <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
            )}
          </Stack>

          <Stack>
            <Typography variant="h5">
              {`${
                carboneEmissionsPreviousYearDifferencePercentage > 0 ? "+" : ""
              }${carboneEmissionsPreviousYearDifferencePercentage}%`}
            </Typography>
          </Stack>
        </StatsDetailsTableColumn>
      )}

      {selectedCarboneEmissionIndex < carboneEmissions.length - 1 && (
        <StatsDetailsTableColumn>
          <Stack>
            <Typography variant="h6">
              {`${carboneEmissions[selectedCarboneEmissionIndex + 1]?.year}`}
            </Typography>
            {carboneEmissionsNextYearDifferencePercentage > 0 ? (
              <NorthEastIcon sx={{ color: ERROR_COLOR }} />
            ) : (
              <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
            )}
          </Stack>
          <Stack>
            <Typography variant="h5">
              {`${
                carboneEmissionsNextYearDifferencePercentage > 0 ? "+" : ""
              }${carboneEmissionsNextYearDifferencePercentage}%`}
            </Typography>
          </Stack>
        </StatsDetailsTableColumn>
      )}
    </StatsDetailsTable>
  );
};

export default WorldStatsDetailsTable;
