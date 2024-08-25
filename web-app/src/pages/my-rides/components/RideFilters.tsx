import { useQuery } from "@apollo/client";
import {
  Container,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import { GetTransportationsQuery } from "@/gql/graphql";
import { RideFilterData } from "@/type/RideFilterData.type";
import { capitalizeFirstLetter } from "@/utils/typo.utils";

interface RideFiltersProps {
  handleRideFilter: (filterData: RideFilterData) => void;
  closeModal: () => void;
  handleModalResponsive?: () => void;
}

const RideFilters = ({
  handleRideFilter,
  closeModal,
  handleModalResponsive,
}: RideFiltersProps) => {
  const [filterData, setFilterData] = useState<RideFilterData>({});

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  const handleClearFilters = () => {
    const clearedFilterData: RideFilterData = {};
    setFilterData(clearedFilterData);
    handleRideFilter(clearedFilterData);
    closeModal();
  };

  if (handleModalResponsive) handleModalResponsive();

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
      <Typography variant="h2" my={4}>
        Mes trajets
      </Typography>
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
          size="small"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
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
          size="small"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
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
          value={filterData.transportationId || ""}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => {
            setFilterData({
              ...filterData,
              transportationId: parseInt(event.target.value),
              transportationMode: data?.transportations.find(
                (transportation) =>
                  transportation.id === parseInt(event.target.value)
              )?.label,
            });
          }}
        >
          {data ? (
            data.transportations.map((transportation) => (
              <MenuItem key={transportation.id} value={transportation.id}>
                {capitalizeFirstLetter(transportation.label)}
              </MenuItem>
            ))
          ) : (
            <MenuItem></MenuItem>
          )}
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
