import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { useMemo } from "react";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/styles/constants";
import {
  CountryCO2EmissionsDetailsColumn,
  CountryCO2EmissionsDetailsContainer,
} from "@/styles/mui-classes";
import { getPercentage } from "@/utils/maths.utils";

const CountryCarboneEmissionsDetails = ({
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
    <CountryCO2EmissionsDetailsContainer>
      <CountryCO2EmissionsDetailsColumn>
        <Stack>
          <Typography>Co2 t. per capita</Typography>
        </Stack>
        <Stack>
          <Typography variant="h5">
            {carboneEmissions[
              selectedCarboneEmissionIndex
            ]?.carboneEmissionsPerCapita.toFixed(5)}
          </Typography>
        </Stack>
      </CountryCO2EmissionsDetailsColumn>

      {selectedCarboneEmissionIndex > 0 && (
        <CountryCO2EmissionsDetailsColumn>
          <Stack>
            <Typography>
              {`${carboneEmissions[selectedCarboneEmissionIndex - 1]?.year}`}
            </Typography>
          </Stack>
          <Stack>
            {carboneEmissionsPreviousYearDifferencePercentage > 0 ? (
              <NorthEastIcon sx={{ color: ERROR_COLOR }} />
            ) : (
              <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
            )}
            <Typography variant="h5">
              {`${
                carboneEmissionsPreviousYearDifferencePercentage > 0 ? "+" : ""
              }${carboneEmissionsPreviousYearDifferencePercentage}%`}
            </Typography>
          </Stack>
        </CountryCO2EmissionsDetailsColumn>
      )}

      {selectedCarboneEmissionIndex < carboneEmissions.length - 1 && (
        <CountryCO2EmissionsDetailsColumn>
          <Stack>
            <Typography>
              {`${carboneEmissions[selectedCarboneEmissionIndex + 1]?.year}`}
            </Typography>
          </Stack>
          <Stack>
            {carboneEmissionsNextYearDifferencePercentage > 0 ? (
              <NorthEastIcon sx={{ color: ERROR_COLOR, fontSize: 40 }} />
            ) : (
              <SouthEastIcon sx={{ color: SUCCESS_COLOR }} />
            )}
            <Typography variant="h5">
              {`${
                carboneEmissionsNextYearDifferencePercentage > 0 ? "+" : ""
              }${carboneEmissionsNextYearDifferencePercentage}%`}
            </Typography>
          </Stack>
        </CountryCO2EmissionsDetailsColumn>
      )}
    </CountryCO2EmissionsDetailsContainer>
  );
};

export default CountryCarboneEmissionsDetails;
