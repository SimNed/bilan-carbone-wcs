import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import TooltipMouseTracker from "../../../components/maps/TooltipMouseTracker";

import { CARBON_COLOR_CODE_NO_DATA, WHITE_COLOR } from "@/styles/constants";
import { WorldDataFeature } from "@/type/WorldData.type";
import { getCarboneEmissionColorCode } from "@/utils/chart.utils";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";
import { CO2_TON_UNIT_LABEL, PER_CAPITA_UNIT_LABEL } from "@/charts.constants";

interface WorldMapProps {
  selectedYear: number;
  selectedCountryCode: string;
  worldDataFeatures: WorldDataFeature[];
  handleSelectedCountry: (name: string, code: string) => void;
}

const WorldMap = ({
  selectedYear,
  selectedCountryCode,
  worldDataFeatures,
  handleSelectedCountry,
}: WorldMapProps) => {
  const [isTootlipOnCountryHover, setIsTootlipOnCountryHover] = useState(false);
  const [tooltipData, setTooltipData] = useState("");

  const getCarboneEmissionByCountryCode = (code: string) => {
    return (
      worldDataFeatures
        .find((feature: WorldDataFeature) => feature.properties.code === code)
        ?.properties.data.find((data) => data.year === selectedYear) || 0
    );
  };

  return (
    <>
      <ComposableMap
        projectionConfig={{
          center: [0, 0],
          scale: 140,
        }}
        width={800}
        height={300}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup center={[0, 0]} zoom={0.9}>
          <Sphere
            stroke={CARBON_COLOR_CODE_NO_DATA}
            strokeWidth={0.5}
            id="sphere"
            fill="none"
          />
          <Graticule stroke={CARBON_COLOR_CODE_NO_DATA} strokeWidth={0.5} />
          <Geographies geography="/json-datas/world.data.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const carbonEmission = getCarboneEmissionByCountryCode(
                  geo.properties.code
                );
                const carbonEmissionColorCode = carbonEmission
                  ? getCarboneEmissionColorCode(
                      carbonEmission?.carboneEmissionsPerCapita
                    )
                  : CARBON_COLOR_CODE_NO_DATA;

                return (
                  <Geography
                    onMouseOver={() => {
                      setTooltipData(
                        carbonEmission
                          ? `${
                              geo.properties.nameFR
                            }: ${getNumberFormatedToTwoDecimals(
                              carbonEmission.carboneEmissionsPerCapita
                            )} : ${CO2_TON_UNIT_LABEL} ${PER_CAPITA_UNIT_LABEL}`
                          : `${geo.properties.nameFR}: no data`
                      );

                      setIsTootlipOnCountryHover(true);
                    }}
                    onClick={() => {
                      if (carbonEmission) {
                        handleSelectedCountry(
                          geo.properties.code,
                          geo.properties.nameFR
                        );
                      }
                    }}
                    onMouseLeave={() => setIsTootlipOnCountryHover(false)}
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill:
                          geo.properties.code === selectedCountryCode
                            ? "#f4a261"
                            : carbonEmissionColorCode,
                        strokeWidth: ".1",
                        outline: "none",
                        transition: "filter 0.3s ease",
                      },
                      hover: {
                        fill: carbonEmissionColorCode,
                        filter: "brightness(70%)",
                        outline: "none",
                        cursor: carbonEmission ? "pointer" : "default",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {isTootlipOnCountryHover && (
        <TooltipMouseTracker>{tooltipData}</TooltipMouseTracker>
      )}
    </>
  );
};

export default WorldMap;
