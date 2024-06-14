import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import TooltipMouseTracker from "../TooltipMouseTracker/TooltipMouseTracker";
import styles from "./WorldMap.module.css";

import {
  CarboneEmissionData,
  IssuingCountryData,
} from "@/type/CarboneEmissionData.type";
import { getCarboneEmissionColorCode } from "@/utils";
import {
  CARBONE_COLOR_CODE_NO_DATA,
  SECONDARY_COLOR,
} from "@/styles/constants";

const WorldMap = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    name: string;
    carboneEmission: string;
  }>({
    name: "",
    carboneEmission: "0",
  });
  const [worldCarboneEmissions, setWorldCarboneEmissions] = useState<
    IssuingCountryData[]
  >([]);

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

  const getCarboneEmissionByGeo = (geo: any, year: number) => {
    return worldCarboneEmissions
      .find((data: IssuingCountryData) => data.entity === geo.properties.name)
      ?.data.find((c: CarboneEmissionData) => c.year === year)
      ?.carbonEmissionsPerCapita;
  };

  return (
    <>
      <ComposableMap
        projectionConfig={{
          center: [10, 0],
        }}
        style={{ width: "90%", height: "90%" }}
      >
        <Sphere
          stroke={SECONDARY_COLOR}
          strokeWidth={0.5}
          id={"sphere"}
          fill={"none"}
        />
        <Graticule stroke={SECONDARY_COLOR} strokeWidth={0.5} />
        <Geographies geography="/json-datas/countries.geo.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const carboneEmission = getCarboneEmissionByGeo(geo, 2022);
              return (
                <Geography
                  onMouseOver={() => {
                    setTooltipData({
                      name: geo.properties.name,
                      carboneEmission: carboneEmission?.toFixed(2) ?? "0",
                    });
                    setIsTooltipVisible(true);
                  }}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: carboneEmission
                        ? getCarboneEmissionColorCode(carboneEmission)
                        : CARBONE_COLOR_CODE_NO_DATA,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <TooltipMouseTracker
        isVisible={isTooltipVisible}
        borderColor={
          tooltipData.carboneEmission
            ? getCarboneEmissionColorCode(
                parseFloat(tooltipData.carboneEmission)
              )
            : CARBONE_COLOR_CODE_NO_DATA
        }
      >
        {tooltipData.name}: {tooltipData.carboneEmission} t/par habitant
      </TooltipMouseTracker>
    </>
  );
};

export default WorldMap;
