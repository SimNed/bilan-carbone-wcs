import WorldMap from "@/pages/world-footprint-map/components/WorldMap";
import LineChartsYearsEmissionsByCountry from "./components/charts/LineChartYearsEmissionsByCountry";

import { useEffect, useMemo, useState } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

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
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import {
  DEFAULT_CONTENT_HEIGHT,
  DEFAULT_HEADER_HEIGHT,
} from "@/styles/constants";

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
    <Stack direction="column" width="100%" flexGrow={1}>
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

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        height={{
          xs: "auto",
          md: `calc(${DEFAULT_CONTENT_HEIGHT} - ${DEFAULT_HEADER_HEIGHT})`,
        }}
      >
        <Grid item p={{ xs: 2, lg: 4 }}>
          <Stack
            gap={2}
            direction={{ xs: "row", md: "column" }}
            alignItems={{ xs: "flex-end", md: "flex-start" }}
          >
            <Typography variant="h2">
              {
                worldDataFeatures.find(
                  (feature) => feature.properties.code === selectedCountryCode
                )?.properties.nameFR as string
              }
            </Typography>
            <Divider />
            <Typography variant="h3">{selectedYear}</Typography>
            <Stack gap={1} direction="row" alignItems="center">
              <Typography variant="h3">
                {getNumberFormatedToTwoDecimals(
                  selectedCarboneEmissions.find(
                    (emission) => emission.year === selectedYear
                  )?.carboneEmissionsPerCapita || 0
                )}
              </Typography>
              <Typography
                paragraph
              >{`${CO2_TON_UNIT_LABEL} ${PER_CAPITA_UNIT_LABEL}`}</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Stack direction="column">
            <Box flex={4} p={{ xs: 2, md: 4, lg: 8 }}>
              <WorldMap
                selectedYear={selectedYear}
                selectedCountryCode={selectedCountryCode}
                worldDataFeatures={worldDataFeatures}
                handleSelectedCountry={(code: string) =>
                  setSelectedCountryCode(code)
                }
              />
            </Box>
            <LegendContainer
              justifyContent="space-around"
              gap={0}
              elements={MAP_LEGEND_ELEMENTS}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        height={`calc(${DEFAULT_CONTENT_HEIGHT} - ${DEFAULT_HEADER_HEIGHT})`}
      >
        <Grid item xs={12} md={6}>
          <LineChartsYearsEmissionsByCountry
            data={selectedCarboneEmissions}
            selectedYear={selectedYear}
            handleSelectedYear={(year: number) => setSelectedYear(year)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <Loader />
  );
};

export default WorldFootprintMapPage;
