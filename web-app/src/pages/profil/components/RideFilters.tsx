import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import { GetTransportationsQuery } from "@/gql/graphql";
import { RideFilterData } from "@/type/RideFilterData.type";
import { capitalizeFirstLetter } from "@/utils";
import { useQuery } from "@apollo/client";
import {
  Container,
  Button,
  Select,
  TextField,
  Typography,
  MenuItem,
  Slider,
} from "@mui/material";
import { useState } from "react";

const RideFilters = ({
  handleRideFilter,
  closeModal,
}: {
  handleRideFilter: (filterData: RideFilterData) => void;
  closeModal: () => void;
}) => {
  const [filterData, setFilterData] = useState<RideFilterData>({});

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  const handleClearFilters = () => {
    const clearedFilterData: RideFilterData = {};
    setFilterData(clearedFilterData);
    handleRideFilter(clearedFilterData);
    closeModal();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleRideFilter(filterData);
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          label="Nom du trajet"
          size="small"
          InputLabelProps={{ shrink: true }}
          placeholder="Rechercher"
          value={filterData.label || ""}
          onChange={(e) =>
            setFilterData({ ...filterData, label: e.target.value })
          }
          sx={{ marginBottom: "1rem", width: "100%" }}
        />
        <TextField
          label="A partir du"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            filterData.startDate
              ? filterData.startDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(event) => {
            setFilterData({
              ...filterData,
              startDate: new Date(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
        />
        <TextField
          label="Jusqu'au"
          size="small"
          InputLabelProps={{ shrink: true }}
          type="date"
          value={
            filterData.endDate
              ? filterData.endDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(event) => {
            setFilterData({
              ...filterData,
              endDate: new Date(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
        />

        <Typography id="distance-slider" gutterBottom>
          Distance
        </Typography>
        <Slider
          getAriaLabel={() => "Distance"}
          value={[0, 100]}
          valueLabelDisplay="auto"
          aria-labelledby="display-slider"
          disableSwap
        />

        <Select
          label="Moyen de transport"
          size="small"
          value={filterData.transportationMode || ""}
          onChange={(event) => {
            setFilterData({
              ...filterData,
              transportationMode: event.target.value,
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
        >
          {data?.transportations.map((transportation) => (
            <MenuItem key={transportation.id} value={transportation.label}>
              {capitalizeFirstLetter(transportation.label)}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ flex: 1 }}
        >
          Rechercher
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
          sx={{ flex: 1 }}
        >
          Effacer les filtres
        </Button>
      </div>
    </form>
  );
};

export default RideFilters;
