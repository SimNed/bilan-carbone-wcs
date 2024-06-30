import { SearchRidesQuery } from "@/gql/graphql";
import { Button, Stack } from "@mui/material";
import RideCard from "./RideCard";
import { useModal } from "@/components/Layout/Layout";

import { RideFilterData } from "@/type/RideFilterData.type";
import RideFilters from "./RideFilters";

const RidesList = ({ data }: { data: SearchRidesQuery }) => {
  const { handleModalComponent, handleCloseModal } = useModal();

  const handleRideFilter = (filterData: RideFilterData) => {
    console.log("filterData", filterData);
    // refetch(filterData);
  };

  return (
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
        {data && data.searchRides.map((ride) => <RideCard ride={ride} />)}
      </Stack>
    </Stack>
  );
};

export default RidesList;
