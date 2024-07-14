import { useMemo } from "react";
import { SearchRidesQuery } from "@/gql/graphql";
import Comparator from "../../../components/charts/Comparator/Comparator";
import { getMonthWithId } from "@/utils/date.utils";
import {
  checkRideMonthAndYearEquality,
  getTotalEmissions,
} from "@/utils/ride.utils";
import PieChartRidesCounter from "./charts/PieChartRidesCounter";
import { RideData } from "@/type/RideData.type";
import PieChartRidesEmissions from "./charts/PieChartRidesEmissions";

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
        comparatedValues: [
          {
            label: "trajets",
            value: currentRides.length,
          },
          {
            label: "co2 en t",
            value: getTotalEmissions(currentRides),
          },
        ],
      }}
      comparatedElements={[
        {
          label: getMonthWithId(month - 1),
          comparatedValues: [
            {
              label: "trajets",
              value: prevRides.length,
              optionalNode: <PieChartRidesCounter rides={prevRides} />,
            },
            {
              label: "co2 en t",
              value: getTotalEmissions(prevRides),
              optionalNode: <PieChartRidesEmissions rides={prevRides} />,
            },
          ],
        },
        {
          label: getMonthWithId(month + 1),
          comparatedValues: [
            {
              label: "trajets",
              value: nextRides.length,
              optionalNode: <PieChartRidesCounter rides={nextRides} />,
            },
            {
              label: "co2 en t",
              value: getTotalEmissions(nextRides),
              optionalNode: <PieChartRidesEmissions rides={nextRides} />,
            },
          ],
        },
      ]}
    />
  );
};

export default RidesCounterDateComparator;
