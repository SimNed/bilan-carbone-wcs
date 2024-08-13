import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { useEffect, useState } from "react";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RideCard from "./components/RideCard";
import RideFilters from "./components/RideFilters";
import { RideFilterData } from "@/type/RideFilterData.type";
import DeleteRide from "./components/DeleteRide";
import { DELETE_RIDE } from "@/api-gql/mutations/ride.mutations";
import {
  DEFAULT_CONTENT_HEIGHT,
  DEFAULT_HEADER_HEIGHT,
  WHITE_COLOR,
} from "@/styles/constants";
import SubHeader from "@/components/headers/SubHeader";
import Loader from "@/components/loader/Loader";
import FiltersChipsList from "./components/FiltersChipsList";
import { enqueueSnackbar } from "notistack";
import { useModal } from "@/providers/ModalProvider";

const RidesPage = () => {
  const [filters, setFilters] = useState<RideFilterData>({});
  const { handleModalComponent, handleCloseModal } = useModal();

  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);

  const { loading, data, refetch } = useQuery<SearchRidesQuery>(SEARCH_RIDES, {
    variables: filters,
    fetchPolicy: "cache-and-network",
  });

  const [deleteRideMutation] = useMutation(DELETE_RIDE, {
    onCompleted: () => {
      handleCloseModal();
      enqueueSnackbar("trajet supprimé.", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("le trajet n'a pas pu être supprimé.", {
        variant: "error",
      });
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

  return !loading && data ? (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      sx={{ backgroundColor: WHITE_COLOR }}
    >
      <SubHeader
        leftChildren={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">
              {`${userData?.getUserProfile.firstName} ${userData?.getUserProfile.lastName}`}
            </Typography>

            <Box>
              <Button
                variant="outlined"
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
            </Box>
          </Stack>
        }
        rightChildren={
          <Stack
            direction="row"
            justifyContent={{ xs: "space-between", md: "flex-start" }}
            flexWrap="wrap"
            gap={1}
            py={2}
            sx={{ backgroundColor: WHITE_COLOR }}
          >
            <FiltersChipsList
              filters={filters}
              handleDeleteFilter={handleDeleteFilter}
            />
          </Stack>
        }
      />
      <Grid
        container
        position="relative"
        direction="row"
        top={{
          xs: DEFAULT_HEADER_HEIGHT,
          md: 0,
        }}
        height={`calc(${DEFAULT_CONTENT_HEIGHT} - ${DEFAULT_HEADER_HEIGHT})`}
      >
        <Grid
          container
          item
          display={{ xs: "none", md: "grid" }}
          xs={4}
          height="inherit"
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
          p={data.searchRides.length > 0 ? 8 : 0}
          height="inherit"
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
            <Stack justifyContent="center" alignItems="center" height="inherit">
              <Typography paragraph>Aucun trajet.</Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <Loader />
  );
};

export default RidesPage;
