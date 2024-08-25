import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import FlightIcon from "@mui/icons-material/Flight";
import LabelIcon from "@mui/icons-material/Label";

import { getDateFormatedForDisplay } from "@/utils/date.utils";
import { getRideEmissionsInKg } from "@/utils/ride.utils";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  BASE_BORDER,
  BLACK_COLOR,
  BUS_COLOR_CODE,
  CAR_COLOR_CODE,
  GRAY_COLOR,
  PLANE_COLOR_CODE,
  TRAIN_COLOR_CODE,
  WHITE_COLOR,
} from "@/styles/constants";
import { CO2_KG_UNIT_LABEL } from "@/charts.constants";

import { useRouter } from "next/router";
import { getNumberFormatedToTwoDecimals } from "@/utils/maths.utils";

interface RideCardProps {
  ride: any;
}

const RideCard = ({ ride }: RideCardProps) => {
  const router = useRouter();
  const getCardTransportationInfos = (transportationLabel: string) => {
    switch (transportationLabel) {
      case "voiture":
        return {
          icon: <DirectionsCarFilledIcon />,
          color: CAR_COLOR_CODE,
        };
      case "bus":
        return {
          icon: <DirectionsBusIcon />,
          color: BUS_COLOR_CODE,
        };
      case "train":
        return {
          icon: <DirectionsRailwayIcon />,
          color: TRAIN_COLOR_CODE,
        };
      case "avion":
        return {
          icon: <FlightIcon />,
          color: PLANE_COLOR_CODE,
        };
      default:
        return;
    }
  };

  const cardTransportationInfos = getCardTransportationInfos(
    ride.transportation.label
  );

  return (
    <Card sx={{ m: 2, borderRadius: 2 }}>
      <CardContent sx={{ backgroundColor: "#fff" }}>
        <Stack direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              color={BLACK_COLOR}
            >
              {cardTransportationInfos?.icon}
              {ride.transportation.label}
            </Stack>
            <Typography paragraph>{ride.label.toUpperCase()}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push(`/rides/${ride.id}`)}
            >
              <VisibilityOutlinedIcon />
            </Button>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flex={3}
            mx={2}
            p={2}
          >
            <Typography variant="h5">
              {getDateFormatedForDisplay(ride.date)}
            </Typography>
            <Typography paragraph>{ride.distance} km</Typography>
            <Typography paragraph>
              {getNumberFormatedToTwoDecimals(getRideEmissionsInKg(ride))}{" "}
              {CO2_KG_UNIT_LABEL}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RideCard;
