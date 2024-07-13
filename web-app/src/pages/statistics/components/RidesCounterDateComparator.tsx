import { useMemo } from "react";
import { SearchRidesQuery } from "@/gql/graphql";
import Comparator from "../../../components/charts/Comparator/Comparator";
import { getMonthWithId } from "@/utils/date.utils";
import { checkRideMonthAndYearEquality } from "@/utils/ride.utils";
import PieChartRidesCounter from "./charts/PieChartRidesCounter";
import { RideData } from "@/type/RideData.type";

const RidesCounterDateComparator = ({
  data,
  currentRides,
  month,
  year,
}: {
  data: SearchRidesQuery;
  currentRides: RideData[];
  month: number;
  year: number;
}) => {
  const prevRides = useMemo(
    () =>
      data.searchRides.filter((ride) =>
        month === 0
          ? checkRideMonthAndYearEquality(ride.date, 11, year - 1)
          : checkRideMonthAndYearEquality(ride.date, month - 1, year)
      ),
    [currentRides]
  );

  const nextRides = useMemo(
    () =>
      data.searchRides.filter((ride) =>
        month === 11
          ? checkRideMonthAndYearEquality(ride.date, 0, year + 1)
          : checkRideMonthAndYearEquality(ride.date, month + 1, year)
      ),
    [currentRides]
  );

  return (
    <Comparator
      baseElement={{
        label: getMonthWithId(month),
        value: currentRides.length,
      }}
      comparatedElements={[
        {
          label: getMonthWithId(month - 1),
          value: prevRides.length,
          optionalNode: (
            <PieChartRidesCounter rides={prevRides} width={80} height={80} />
          ),
        },
        {
          label: getMonthWithId(month + 1),
          value: nextRides.length,
          optionalNode: (
            <PieChartRidesCounter rides={nextRides} width={80} height={80} />
          ),
        },
      ]}
    />
  );
};

export default RidesCounterDateComparator;
