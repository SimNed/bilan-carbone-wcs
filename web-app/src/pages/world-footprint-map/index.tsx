import WorldMap from "@/pages/world-footprint-map/components/WorldMap/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry/LineChartYearsEmissionsByCountry";
import {
  CarboneEmissionData,
  IssuingCountryData,
} from "@/type/CarboneEmissionData.type";
import { useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";

const WorldFootprintMapPage = () => {
  const [worldCarboneEmissions, setWorldCarboneEmissions] = useState<
    IssuingCountryData[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
    data: CarboneEmissionData[] | [];
  }>({
    name: "France",
    code: "FRA",
    data: [],
  });
  const [selectedYear, setSelectedYear] = useState(2022);

  useEffect(() => {
    const fetchWorldCarboneEmissions = () => {
      return fetch("/json-datas/carbone-emissions.json")
        .then((response) => response.json())
        .then((data: IssuingCountryData[]) => {
          console.log(data);
          setWorldCarboneEmissions(data);
        });
    };

    fetchWorldCarboneEmissions();
  }, []);

  useEffect(() => {}, [selectedYear]);

  function handleUpdateSelectedCountry(name: string, code: string) {
    const data = worldCarboneEmissions.find(
      (data) => data.code === selectedCountry.code
    )?.data;

    console.log("DATA", data);

    setSelectedCountry({ name, code, data: data || [] });
  }

  return (
    <Stack direction="row" height="100%" alignItems="center">
      <Stack flex={1} direction="column" justifyContent="center" height="100%">
        <Stack
          flex={1}
          p={4}
          direction="column"
          justifyContent="center"
          spacing={4}
        >
          <Typography variant="h3">{selectedCountry.name}</Typography>
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

          <Typography variant="h4">
            {
              selectedCountry.data.find((data) => data.year === selectedYear)
                ?.carbonEmissionsPerCapita
            }{" "}
            t / habitant
          </Typography>
        </Stack>
        <Stack sx={{ flex: 3 }}>
          <LineChartsYearsEmissionsByCountry
            data={selectedCountry.data}
            selectedYear={selectedYear}
          />
        </Stack>
      </Stack>
      <Box flex={2}>
        <WorldMap
          selectedYear={selectedYear}
          handleSelectedCountry={(name: string, code: string) => {
            handleUpdateSelectedCountry(name, code);
          }}
        />
      </Box>
    </Stack>
  );
};

export default WorldFootprintMapPage;
