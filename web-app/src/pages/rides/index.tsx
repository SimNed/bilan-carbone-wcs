import DividedStack from "@/components/Container/DividedStack";
import CreateRideForm from "./components/CreateRideForm";
import RidesList from "./components/RidesList";
import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { useEffect } from "react";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";

const RidesPage = () => {
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);
  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading || typeof data === "undefined") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DividedStack
      leftNode={<CreateRideForm />}
      rightNode={<RidesList data={data} />}
    />
  );
};

export default RidesPage;
