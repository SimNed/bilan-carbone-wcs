import WorldMap from "@/components/Map/WorldMap/WorldMap";
import {
  HEADER_HEIGHT,
  SECONDARY_COLOR,
  WARNING_COLOR,
} from "@/styles/constants";

const WorldCarboneMapPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: `calc(100vh - ${HEADER_HEIGHT})`,
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }}></div>
      <div
        style={{
          flex: "3",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WorldMap />
      </div>
    </div>
  );
};

export default WorldCarboneMapPage;
