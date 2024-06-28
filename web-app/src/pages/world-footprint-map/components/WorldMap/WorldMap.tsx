import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import TooltipMouseTracker from "../../../../components/Map/TooltipMouseTracker/TooltipMouseTracker";

import { IssuingCountryData } from "@/type/CarboneEmissionData.type";
import { getCarboneEmissionColorCode } from "@/utils";
import { CARBONE_COLOR_CODE_NO_DATA } from "@/styles/constants";

const WorldMap = ({
  selectedYear,
  handleSelectedCountry,
}: {
  selectedYear: number;
  handleSelectedCountry: (name: string, code: string) => void;
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState("");

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

  const getCarboneEmissionByCountryCode = (code: string) => {
    return worldCarboneEmissions
      .find((data: IssuingCountryData) => data.code === code)
      ?.data.find((data) => data.year === selectedYear);
  };

  return (
    <>
      <ComposableMap
        projectionConfig={{
          center: [0, 0],
          scale: 140,
        }}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Sphere stroke="#CCC" strokeWidth={0.5} id="sphere" fill="none" />
        <Graticule stroke="#CCC" strokeWidth={0.5} />
        <Geographies geography="/json-datas/countries.geo.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const carboneEmission = getCarboneEmissionByCountryCode(
                geo.properties.code
              );
              return (
                <Geography
                  onMouseOver={() => {
                    setTooltipData(
                      carboneEmission
                        ? `${
                            geo.properties.nameFR
                          }: ${carboneEmission.carbonEmissionsPerCapita.toFixed(
                            2
                          )} t / habitant`
                        : `${geo.properties.nameFR}: no data`
                    );

                    setIsTooltipVisible(true);
                  }}
                  onClick={() => {
                    if (carboneEmission) {
                      handleSelectedCountry(
                        geo.properties.code,
                        geo.properties.nameFR
                      );
                    }
                  }}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: carboneEmission
                        ? getCarboneEmissionColorCode(
                            carboneEmission?.carbonEmissionsPerCapita
                          )
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

      <TooltipMouseTracker isVisible={isTooltipVisible}>
        {tooltipData}
      </TooltipMouseTracker>
    </>
  );
};

export default WorldMap;
