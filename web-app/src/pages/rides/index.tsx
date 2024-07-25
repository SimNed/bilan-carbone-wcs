import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { useEffect, useState } from "react";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RideCard from "./components/RideCard";
import RideFilters from "./components/RideFilters";
import { useModal } from "@/components/layout/Layout";
import { RideFilterData } from "@/type/RideFilterData.type";
import DeleteRide from "./components/DeleteRide";
import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";

const RidesPage = () => {
  const [filters, setFilters] = useState<RideFilterData>({});

  const { handleModalComponent, handleCloseModal } = useModal();

  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);

  const { loading, error, data, refetch } = useQuery<SearchRidesQuery>(
    SEARCH_RIDES,
    {
      variables: filters,
      fetchPolicy: "cache-and-network",
    }
  );

  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      handleCloseModal();
    },
  });

  const handleDeleteRide = (rideId: number) => {
    handleModalComponent(
      <DeleteRide
        rideId={rideId}
        handleDeleteRideConfirmation={handleDeleteRideConfirmation}
        handleCloseModal={handleCloseModal}
      />
    );
  };

  const handleDeleteRideConfirmation = (rideId: number) => {
    console.log("RIDE ID", rideId);
    deleteRideMutation({
      variables: { id: rideId },
      refetchQueries: [{ query: SEARCH_RIDES, variables: { ...filters } }],
    });
  };

  const handleRideFilter = (filterData: RideFilterData) => {
    setFilters(filterData);
    refetch();
    handleCloseModal();
  };

  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  if (loading || typeof data === "undefined") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data.searchRides.length > 0 ? (
    <Stack direction="row">
      <Stack direction="column" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleModalComponent(
              <RideFilters
                handleRideFilter={handleRideFilter}
                closeModal={handleCloseModal}
              />
            )
          }
        >
          Filtrer les trajets
        </Button>
        {data &&
          data.searchRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              handleDeleteRide={handleDeleteRide}
            />
          ))}
      </Stack>
    </Stack>
  ) : (
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
      <Typography paragraph>Aucun trajet enregistré.</Typography>
    </Container>
  );
};

export default RidesPage;
