import { Card, CardContent, Typography, Button } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import FlightIcon from "@mui/icons-material/Flight";

import LabelIcon from "@mui/icons-material/Label";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Stack } from "@mui/system";
import { getFormatedDate } from "@/utils/date.utils";
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

interface RideCardProps {
  ride: any;
  handleDeleteRide: (rideId: number) => void;
}

const RideCard = ({ ride, handleDeleteRide }: RideCardProps) => {
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
        <Stack direction="column" p={2} gap={2}>
          <Stack direction="row">
            <LabelIcon
              sx={{
                fontSize: 40,
                color: cardTransportationInfos?.color,
                transform: "translate(70%, -20%) rotate(90deg)",
              }}
            />
            <Stack
              p={2}
              borderRadius={2}
              border={`1px solid ${cardTransportationInfos?.color}`}
              sx={{
                "& > *": { fontSize: "3rem" },
              }}
              color={BLACK_COLOR}
            >
              {cardTransportationInfos?.icon}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flex={3}
              mx={2}
              px={2}
            >
              <Typography paragraph>{ride.label}</Typography>
              <Typography
                variant="h5"
                borderBottom={BASE_BORDER}
                color={GRAY_COLOR}
              >
                {getFormatedDate(ride.date)}
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleDeleteRide(ride.id)}
              style={{
                margin: "0.5rem",
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </Stack>
          <Stack flexGrow={1} direction="column">
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              p={4}
              sx={{
                backgroundColor: WHITE_COLOR,
                borderRadius: 2,
              }}
            >
              <Stack direction="column" alignItems="center" gap={2} my={1}>
                <Typography paragraph>MOYEN DE TRANSPORT</Typography>
                <Typography variant="h4">
                  {ride.transportation.label}
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="center" gap={2} my={1}>
                <Typography paragraph>DISTANCE</Typography>
                <Typography variant="h4">{ride.distance} km</Typography>
              </Stack>
              <Stack direction="column" alignItems="center" gap={2} my={1}>
                <Typography paragraph>{CO2_KG_UNIT_LABEL}</Typography>
                <Typography variant="h4">
                  {(ride.distance *
                    ride.transportation.carbonEmissionsByGrPerKm) /
                    1000}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RideCard;
