import WorldMap from "@/pages/world-footprint-map/components/WorldMap/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry/LineChartYearsEmissionsByCountry";
import {
  CarboneEmissionData,
  IssuingCountryData,
} from "@/type/CarboneEmissionData.type";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";
import {
  WORLD_EMISSIONS_BREAKPOINT_1,
  WORLD_EMISSIONS_BREAKPOINT_2,
  WORLD_EMISSIONS_BREAKPOINT_3,
  WORLD_EMISSIONS_BREAKPOINT_4,
  WORLD_EMISSIONS_BREAKPOINT_5,
  WORLD_EMISSIONS_BREAKPOINT_6,
  WORLD_EMISSIONS_BREAKPOINT_7,
  WORLD_EMISSIONS_BREAKPOINT_8,
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/utils/constants.utils";
import SquareIcon from "@mui/icons-material/Square";
import {
  CARBONE_COLOR_CODE_1,
  CARBONE_COLOR_CODE_2,
  CARBONE_COLOR_CODE_3,
  CARBONE_COLOR_CODE_4,
  CARBONE_COLOR_CODE_5,
  CARBONE_COLOR_CODE_6,
  CARBONE_COLOR_CODE_7,
  CARBONE_COLOR_CODE_8,
  CARBONE_COLOR_CODE_9,
} from "@/styles/constants";

const WorldFootprintMapPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [selectedYear, setSelectedYear] = useState(2022);

  const [worldCarboneEmissions, setWorldCarboneEmissions] = useState<
    IssuingCountryData[] | []
  >([]);

  const [selectedCarboneEmissions, setSelectedCarboneEmissions] = useState<
    CarboneEmissionData[] | []
  >([]);

  const fetchWorldCarboneEmissions = useMemo(
    () => async () => {
      return await fetch("/json-datas/carbone-emissions.json")
        .then((response) => response.json())
        .then((data: IssuingCountryData[]) => setWorldCarboneEmissions(data));
    },
    []
  );

  const selectItems = [];

  for (let i = WORLD_EMISSIONS_END_DATE; i >= WORLD_EMISSIONS_START_DATE; i--) {
    selectItems.push({ value: i, label: i });
  }

  useEffect(() => {
    fetchWorldCarboneEmissions();
    setSelectedCountryCode("FRA");
    setSelectedCountryName("France");
  }, []);

  useEffect(() => {
    const carboneEmissions = worldCarboneEmissions.find(
      (data) => data.code === selectedCountryCode
    );
    if (!carboneEmissions) return;
    console.log("TEST", worldCarboneEmissions);
    setSelectedCarboneEmissions(carboneEmissions.data);
  }, [selectedCountryCode, worldCarboneEmissions]);

  useEffect(() => {}, [selectedYear]);

  return worldCarboneEmissions ? (
    <Stack direction="row" height="100%" alignItems="center">
      <Stack flex={2} direction="column" justifyContent="center" height="100%">
        <Stack
          flex={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" textAlign="center" p={2}>
            {selectedCountryName}
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" flex={6}>
          <Stack>
            <ArrowsNavigation
              navLabel={selectedYear}
              onClickLeft={() => {
                if (selectedYear > WORLD_EMISSIONS_START_DATE)
                  setSelectedYear(selectedYear - 1);
              }}
              onClickRight={() => {
                if (selectedYear < WORLD_EMISSIONS_END_DATE)
                  setSelectedYear(selectedYear + 1);
              }}
              onSelectChange={(value) => setSelectedYear(value as number)}
              selectItems={selectItems}
              selectValue={{
                label: selectedYear,
                value: selectedYear,
              }}
            />
          </Stack>
          <LineChartsYearsEmissionsByCountry
            data={selectedCarboneEmissions}
            selectedYear={selectedYear}
          />
        </Stack>
        <Stack justifyContent="center" alignItems="center" flex={2}>
          <Typography variant="h4">
            {selectedCarboneEmissions
              .find((data) => data.year === selectedYear)
              ?.carbonEmissionsPerCapita.toFixed(5)}{" "}
            t.co2 / habitant
          </Typography>
        </Stack>
      </Stack>
      <Box flex={3}>
        <WorldMap
          selectedYear={selectedYear}
          handleSelectedCountry={(code: string, name: string) => {
            setSelectedCountryCode(code);
            setSelectedCountryName(name);
          }}
        />
        <Stack spacing={2} direction="row" justifyContent="center">
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_1 }} />
            <p>{`< ${WORLD_EMISSIONS_BREAKPOINT_1}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_2 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_1} - ${WORLD_EMISSIONS_BREAKPOINT_2}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_3 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_2} - ${WORLD_EMISSIONS_BREAKPOINT_3}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_4 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_3} - ${WORLD_EMISSIONS_BREAKPOINT_4}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_5 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_4} - ${WORLD_EMISSIONS_BREAKPOINT_5}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_6 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_5} - ${WORLD_EMISSIONS_BREAKPOINT_6}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_7 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_6} - ${WORLD_EMISSIONS_BREAKPOINT_7}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_8 }} />
            <p>{`${WORLD_EMISSIONS_BREAKPOINT_7} - ${WORLD_EMISSIONS_BREAKPOINT_8}`}</p>
          </Stack>
          <Stack direction="row" alignItems="center">
            <SquareIcon sx={{ color: CARBONE_COLOR_CODE_9 }} />
            <p>{`> ${WORLD_EMISSIONS_BREAKPOINT_8}`}</p>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  ) : (
    <p>Loading</p>
  );
};

export default WorldFootprintMapPage;
