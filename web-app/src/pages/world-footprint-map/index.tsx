import WorldMap from "@/pages/world-footprint-map/components/map/WorldMap/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry";
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowsNavigation from "@/components/Nav/ArrowsNavigtion";
import {
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/utils/constants.utils";
import { WorldData, WorldDataFeature } from "@/type/WorldData.type";
import WorldMapLegend from "./components/map/WorldMapLegend/WorldMapLegend";
import CountryCarboneEmissionsDetails from "./components/CountryCarboneEmissionsDetails";

const WorldFootprintMapPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedYear, setSelectedYear] = useState(WORLD_EMISSIONS_END_DATE);

  const [worldDataFeatures, setWorldDataFeatures] = useState<
    WorldDataFeature[]
  >([]);

  const [selectedCarboneEmissions, setSelectedCarboneEmissions] = useState<
    CarboneEmissionData[] | []
  >([]);

  const fetchWorldDataFeatures = useMemo(
    () => async () => {
      return await fetch("/json-datas/world.data.json")
        .then((response) => response.json())
        .then((data: WorldData) => setWorldDataFeatures(data.features));
    },
    []
  );

  const selectYearItems = [];
  const selectNameItems = worldDataFeatures.map((data: any) => {
    return { value: data.properties.code, label: data.properties.nameFR };
  });

  for (let i = WORLD_EMISSIONS_START_DATE; i <= WORLD_EMISSIONS_END_DATE; i++) {
    selectYearItems.push({ value: i, label: i });
  }

  useEffect(() => {
    fetchWorldDataFeatures();
    setSelectedCountryCode("FRA");
  }, []);

  useEffect(() => {
    const carboneEmissions = worldDataFeatures.find(
      (feature) => feature.properties.code === selectedCountryCode
    )?.properties.data;

    if (!carboneEmissions) return;
    setSelectedCarboneEmissions(carboneEmissions);
  }, [selectedCountryCode, worldDataFeatures]);

  return worldDataFeatures && selectedCountryCode && selectedYear ? (
    <Stack direction="column" height="100%">
      <Stack direction="row" flex={1}>
        <ArrowsNavigation
          flex={2}
          handleSelectChange={(code) => setSelectedCountryCode(code as string)}
          selectItems={selectNameItems}
          selectValue={{
            label: worldDataFeatures.find(
              (feature) => feature.properties.code === selectedCountryCode
            )?.properties.nameFR as string,
            value: selectedCountryCode,
          }}
        />
        <ArrowsNavigation
          flex={3}
          isReversed
          handleSelectChange={(value) => setSelectedYear(value as number)}
          selectItems={selectYearItems}
          selectValue={{
            label: selectedYear,
            value: selectedYear,
          }}
        />
      </Stack>

      <Stack direction="row" flex={5}>
        <Stack direction="column" flex={2}>
          <Stack flex={4} justifyContent="center" alignItems="center">
            <LineChartsYearsEmissionsByCountry
              data={selectedCarboneEmissions}
              selectedYear={selectedYear}
              handleSelectedYear={(year: number) => setSelectedYear(year)}
            />
          </Stack>
          <Stack flex={1} justifyContent="center" alignItems="center">
            {selectedCarboneEmissions && (
              <CountryCarboneEmissionsDetails
                carboneEmissions={selectedCarboneEmissions}
                selectedYear={selectedYear}
              />
            )}
          </Stack>
        </Stack>
        <Stack direction="column" flex={3}>
          <Box flex={4} p={4}>
            <WorldMap
              selectedYear={selectedYear}
              worldDataFeatures={worldDataFeatures}
              handleSelectedCountry={(code: string) =>
                setSelectedCountryCode(code)
              }
            />
          </Box>
          <WorldMapLegend />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <p>Loading</p>
  );
};

export default WorldFootprintMapPage;
