import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import FlightIcon from "@mui/icons-material/Flight";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Stack } from "@mui/system";
import { getFormatedDate } from "@/utils/date.utils";
import { BASE_BORDER, WHITE_COLOR } from "@/styles/constants";

interface RideCardProps {
  ride: any;
  handleDeleteRide: (rideId: number) => void;
}

const RideCard = ({ ride, handleDeleteRide }: RideCardProps) => {
  const getCardIcon = (transportationLabel: string) => {
    switch (transportationLabel) {
      case "voiture":
        return <DirectionsCarFilledIcon sx={{ fontSize: "3rem" }} />;
      case "bus":
        return <DirectionsBusIcon sx={{ fontSize: "3rem" }} />;
      case "train":
        return <DirectionsRailwayIcon sx={{ fontSize: "3rem" }} />;
      case "avion":
        return <FlightIcon sx={{ fontSize: "3rem" }} />;
      default:
        return;
    }
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardContent sx={{ border: BASE_BORDER }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            fontSize="5rem"
            flex={1}
            p={2}
            borderRight={BASE_BORDER}
          >
            {getCardIcon(ride.transportation.label)}
            <Typography variant="h4">{getFormatedDate(ride.date)}</Typography>
          </Stack>

          <Stack
            direction="column"
            flex={4}
            sx={{ backgroundColor: WHITE_COLOR }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={BASE_BORDER}
              p={2}
            >
              <Typography
                variant="h4"
                gutterBottom
                style={{ marginBottom: "0.5rem" }}
              >
                {ride.label}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeleteRide(ride.id)}
                style={{
                  margin: "0.5rem",
                }}
              >
                <DeleteOutlineIcon />
              </Button>
            </Stack>

            <Box flex={3} p={2}>
              <Stack direction="row" alignItems="center" gap={2} my={1}>
                <Typography variant="h4">Moyen de transport:</Typography>
                <Typography variant="h6">
                  {ride.transportation.label}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} my={1}>
                <Typography variant="h4">Distance:</Typography>
                <Typography variant="h6">{ride.distance}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={2} my={1}>
                <Typography variant="h4">Emissions de Co2:</Typography>
                <Typography variant="h6">
                  {(ride.distance * ride.transportation.carboneEmission) / 1000}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RideCard;
