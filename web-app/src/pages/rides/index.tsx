import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { useState, useEffect } from "react";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RideCard from "./components/RideCard";
import RideFilters from "./components/RideFilters";
import { useModal } from "@/components/layout/Layout";
import { RideFilterData } from "@/type/RideFilterData.type";
import DeleteRide from "./components/DeleteRide";
import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { DEFAULT_HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import LegendContainer from "@/components/containers/LegendContainer";
import { STATISTICS_LEGEND_ELEMENTS } from "@/constants/charts.constants";

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

  const handleDeleteFilter = (key: keyof RideFilterData) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    refetch();
  };

  useEffect(() => {
    console.log("Filters", filters);
  }, [filters]);

  if (loading || typeof data === "undefined") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height={DEFAULT_HEADER_HEIGHT}
        sx={{ backgroundColor: WHITE_COLOR }}
        width="100%"
        position="sticky"
        top={DEFAULT_HEADER_HEIGHT}
        zIndex={100}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="row"
          justifyContent={{ xs: "space-between", md: "flex-start" }}
          alignItems="center"
          sx={{ backgroundColor: WHITE_COLOR }}
        >
          <Typography variant="h5" mx={4}>
            {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ display: { xs: "block", md: "none" } }}
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
        </Grid>
        <Grid item xs={12} md={6} height={DEFAULT_HEADER_HEIGHT}>
          {Object.keys(filters).map((key) => (
            <Chip
              key={key}
              label={`${key}: ${filters[key as keyof RideFilterData]}`}
              onDelete={() => handleDeleteFilter(key as keyof RideFilterData)}
            />
          ))}
        </Grid>
      </Grid>

      <Grid
        container
        position="relative"
        direction="row"
        top={{
          xs: `calc(${DEFAULT_HEADER_HEIGHT})`,
          md: 0,
        }}
        height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT} * 2)`}
      >
        <Grid
          container
          item
          display={{ xs: "none", md: "grid" }}
          xs={4}
          height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT} * 2)`}
          justifyContent="center"
        >
          <Grid
            container
            item
            md={4}
            position="fixed"
            top={`${DEFAULT_HEADER_HEIGHT} * 2`}
            justifyContent="center"
          >
            <RideFilters
              handleRideFilter={handleRideFilter}
              closeModal={handleCloseModal}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          p={8}
          height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT} * 2)`}
        >
          {data && data.searchRides.length > 0 ? (
            data.searchRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                handleDeleteRide={handleDeleteRide}
              />
            ))
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT} * 2)`}
            >
              <Typography paragraph>Aucun trajet.</Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RidesPage;
