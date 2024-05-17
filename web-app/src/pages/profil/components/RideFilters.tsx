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
} from "@mui/material";
import { useState } from "react";

const RideFilters = ({
  handleRideFilter,
}: {
  handleRideFilter: (filterData: RideFilterData) => void;
}) => {
  const [filterData, setFilterData] = useState<RideFilterData>({});

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRideFilter(filterData);
          setFilterData({});
        }}
      >
        <div style={{ width: "100%", marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <Typography variant="body1">Nom du trajet:</Typography>  
        <TextField
          placeholder="Rechercher"
          onChange={(e) =>
            setFilterData({ ...filterData, label: e.target.value })
          }
          sx={{ marginBottom: "1rem", width: "100%" }}
          />
        <Typography variant="body1">Moyen de transport:</Typography>
        <Select
          onChange={(e) =>
            setFilterData({
              ...filterData,
              transportationId: parseInt(e.target.value as string),
            })
          }
          sx={{ width: "100%", marginBottom: "1rem" }}
          >
          {data?.transportations.map((transportation) => (
            <option value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </option>
          ))}
        </Select>

        <Typography variant="body1">A partir du :</Typography>
        <TextField
          type="date"
          onChange={(event) => {
            setFilterData({
              ...filterData,
              startDate: new Date(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
          />
        <Typography variant="body1">Jusqu'au :</Typography>
        <TextField
          type="date"
          onChange={(event) => {
            setFilterData({
              ...filterData,
              endDate: new Date(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
          />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="body1">Distance minimum :</Typography>
        <TextField
          type="number"
          onChange={(event) => {
            setFilterData({
              ...filterData,
              minDistance: parseInt(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
          />
        <Typography variant="body1">Distance maximum :</Typography>
        <TextField
          type="number"
          onChange={(event) => {
            setFilterData({
              ...filterData,
              maxDistance: parseInt(event.target.value),
            });
          }}
          sx={{ marginBottom: "1rem", width: "100%" }}
          />
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "100%" }}
            >
            Rechercher
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RideFilters;
