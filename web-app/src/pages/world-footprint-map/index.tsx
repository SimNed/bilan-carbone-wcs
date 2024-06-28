import WorldMap from "@/pages/world-footprint-map/components/WorldMap/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry/LineChartYearsEmissionsByCountry";
import {
  CarboneEmissionData,
  IssuingCountryData,
} from "@/type/CarboneEmissionData.type";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";

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
  }, [selectedCountryCode]);

  useEffect(() => {}, [selectedYear]);

  return worldCarboneEmissions ? (
    <Stack direction="row" height="100%" alignItems="center">
      <Stack flex={1} direction="column" justifyContent="center" height="100%">
        <Stack flexGrow={0} direction="column" justifyContent="center">
          <Typography variant="h3" p={4}>
            {selectedCountryName}
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" flex={3}>
          <Stack>
            <ArrowsNavigation
              navLabel={selectedYear}
              onClickLeft={() => {
                if (selectedYear > 1820) setSelectedYear(selectedYear - 1);
              }}
              onClickRight={function (): void {
                if (selectedYear < 2022) setSelectedYear(selectedYear + 1);
              }}
            />
          </Stack>
          <LineChartsYearsEmissionsByCountry
            data={selectedCarboneEmissions}
            selectedYear={selectedYear}
          />
        </Stack>
        <Stack justifyContent="center" alignItems="center" flex={1}>
          <Typography variant="h4">
            {selectedCarboneEmissions
              .find((data) => data.year === selectedYear)
              ?.carbonEmissionsPerCapita.toFixed(5)}{" "}
            t / habitant
          </Typography>
        </Stack>
      </Stack>
      <Box flex={2}>
        <WorldMap
          selectedYear={selectedYear}
          handleSelectedCountry={(code: string, name: string) => {
            setSelectedCountryCode(code);
            setSelectedCountryName(name);
          }}
        />
      </Box>
    </Stack>
  ) : (
    <p>Loading</p>
  );
};

export default WorldFootprintMapPage;
