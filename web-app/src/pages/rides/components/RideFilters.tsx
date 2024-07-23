import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import { GetTransportationsQuery } from "@/gql/graphql";
import { RideFilterData } from "@/type/RideFilterData.type";
import { capitalizeFirstLetter } from "@/utils/typo.utils";
import { useQuery } from "@apollo/client";
import {
  Container,
  Button,
  TextField,
  Typography,
  MenuItem,
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        p: 6,
      }}
    >
      <Typography variant="h5">Filtrer mes trajets</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRideFilter(filterData);
        }}
        style={{ width: "100%", marginTop: "1rem" }}
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

        <TextField
          label="Distance minimum"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={filterData.minDistance || ""}
          onChange={(event) => {
            setFilterData({
              ...filterData,
              minDistance: parseInt(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
        />
        <TextField
          label="Distance maximum"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={filterData.maxDistance || ""}
          onChange={(event) => {
            setFilterData({
              ...filterData,
              maxDistance: parseInt(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
        />

        <TextField
          select
          label="Moyen de transport"
          size="small"
          value={filterData.transportationMode || ""}
          onChange={(event) => {
            console.log("CONSOLELOGEVENT", event.target.value);
            setFilterData({
              ...filterData,
              transportationId: parseInt(event.target.value),
            });
          }}
        >
          {data?.transportations.map((transportation) => (
            <MenuItem key={transportation.id} value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mb: 2 }}
          fullWidth
        >
          Rechercher
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="success"
          onClick={handleClearFilters}
          sx={{ mb: 4 }}
        >
          Effacer les filtres
        </Button>
      </form>
    </Container>
  );
};

export default RideFilters;
