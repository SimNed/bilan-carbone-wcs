import WorldMap from "@/pages/world-footprint-map/components/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry";
import { CarboneEmissionData } from "@/type/CarboneEmissionData.type";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/constants/constants";
import { WorldData, WorldDataFeature } from "@/type/WorldData.type";
import CountryCarboneEmissionsDetails from "./components/CountryCarboneEmissionsDetails";
import SelectWithNavigation from "@/components/Nav/SelectWithNavigtion";
import LegendContainer from "@/components/Container/LegendContainer";
import { MAP_LEGEND_ELEMENTS } from "@/constants/charts.constants";

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

  const selectNameItems = worldDataFeatures.map((data: any) => {
    return { value: data.properties.code, label: data.properties.nameFR };
  });

  const selectYearItems = [];
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
    <Stack direction="column" height="100%" p={4}>
      <Stack direction="row">
        <Stack flex={2}>
          <SelectWithNavigation
            handleSelectChange={(code) =>
              setSelectedCountryCode(code as string)
            }
            selectItems={selectNameItems}
            selectValue={{
              label: worldDataFeatures.find(
                (feature) => feature.properties.code === selectedCountryCode
              )?.properties.nameFR as string,
              value: selectedCountryCode,
            }}
          />
        </Stack>
        <Stack flex={3}>
          <SelectWithNavigation
            isReversed
            handleSelectChange={(value) => setSelectedYear(value as number)}
            selectItems={selectYearItems}
            selectValue={{
              label: selectedYear,
              value: selectedYear,
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" flex={5} spacing={2}>
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
          <LegendContainer elements={MAP_LEGEND_ELEMENTS} />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <p>Loading</p>
  );
};

export default WorldFootprintMapPage;
