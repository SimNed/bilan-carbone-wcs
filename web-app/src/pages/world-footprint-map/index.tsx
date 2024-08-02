import WorldMap from "@/pages/world-footprint-map/components/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry";

import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import {
  CarboneEmission,
  WorldData,
  WorldDataFeature,
} from "@/type/WorldData.type";
import SelectWithNavigation from "@/components/navs/SelectWithNavigtion";
import LegendContainer from "@/components/containers/LegendContainer";
import {
  CO2_TON_UNIT_LABEL,
  MAP_LEGEND_ELEMENTS,
  PER_CAPITA_UNIT_LABEL,
  WORLD_EMISSIONS_END_DATE,
  WORLD_EMISSIONS_START_DATE,
} from "@/charts.constants";

import Loader from "@/components/loader/Loader";
import Comparator from "@/components/charts/Comparator";
import SubHeader from "@/components/headers/SubHeader";

const WorldFootprintMapPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedYear, setSelectedYear] = useState(WORLD_EMISSIONS_END_DATE);

  const [worldDataFeatures, setWorldDataFeatures] = useState<
    WorldDataFeature[]
  >([]);

  const [selectedCarboneEmissions, setSelectedCarboneEmissions] = useState<
    CarboneEmission[] | []
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
    const carbonEmissions = worldDataFeatures.find(
      (feature) => feature.properties.code === selectedCountryCode
    )?.properties.data;

    if (!carbonEmissions) return;
    setSelectedCarboneEmissions(carbonEmissions);
  }, [worldDataFeatures]);

  useEffect(() => {
    const carbonEmissions = worldDataFeatures.find(
      (feature) => feature.properties.code === selectedCountryCode
    )?.properties.data;

    if (!carbonEmissions) return;
    setSelectedCarboneEmissions(carbonEmissions);
  }, [selectedCountryCode, worldDataFeatures]);

  return worldDataFeatures && selectedCountryCode && selectedYear ? (
    <Stack direction="column" height="100%" p={4}>
      <SubHeader
        leftChildren={
          <Stack direction="row">
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
        }
      />

      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="column" flex={2}>
            <Stack flex={4} justifyContent="center" alignItems="center">
              <LineChartsYearsEmissionsByCountry
                data={selectedCarboneEmissions}
                selectedYear={selectedYear}
                handleSelectedYear={(year: number) => setSelectedYear(year)}
              />
            </Stack>
            <Stack flex={1} justifyContent="center" alignItems="center">
              {selectedCarboneEmissions.length > 0 && (
                <Comparator
                  baseElement={{
                    label: selectedYear,
                    comparatedValues: [
                      {
                        label: `${CO2_TON_UNIT_LABEL} ${PER_CAPITA_UNIT_LABEL}`,
                        value:
                          selectedCarboneEmissions.find(
                            (emission) => emission.year === selectedYear
                          )?.carboneEmissionsPerCapita || 0,
                      },
                    ],
                  }}
                  comparatedElements={[
                    {
                      label: selectedYear - 1,
                      comparatedValues: [
                        {
                          label: `${CO2_TON_UNIT_LABEL} ${PER_CAPITA_UNIT_LABEL}`,
                          value:
                            selectedCarboneEmissions.find(
                              (emission) => emission.year === selectedYear - 1
                            )?.carboneEmissionsPerCapita || 0,
                        },
                      ],
                    },
                    {
                      label: selectedYear + 1,
                      comparatedValues: [
                        {
                          label: `${CO2_TON_UNIT_LABEL} ${PER_CAPITA_UNIT_LABEL}`,
                          value:
                            selectedCarboneEmissions.find(
                              (emission) => emission.year === selectedYear + 1
                            )?.carboneEmissionsPerCapita || 0,
                        },
                      ],
                    },
                  ]}
                />
              )}
            </Stack>
          </Stack>
        </Grid>

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
      </Grid>
    </Stack>
  ) : (
    <Loader />
  );
};

export default WorldFootprintMapPage;
