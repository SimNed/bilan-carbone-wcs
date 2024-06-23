import { Card, CardContent, Typography, Button } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import FlightIcon from "@mui/icons-material/Flight";
import { useModal } from "@/components/Layout/Layout";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteRide from "./DeleteRide";
import { Stack } from "@mui/system";
import { getFormatedDate } from "@/utils/date.utils";

interface RideCardProps {
  ride: any;
}

const RideCard = ({ ride }: RideCardProps) => {
  const { handleModalComponent, handleCloseModal } = useModal();

  const getCardIcon = (transportationLabel: string) => {
    switch (transportationLabel) {
      case "voiture":
        return <DirectionsCarFilledIcon sx={{ fontSize: "4rem" }} />;
      case "bus":
        return <DirectionsBusIcon />;
      case "train":
        return <DirectionsRailwayIcon />;
      case "avion":
        return <FlightIcon />;
      default:
        return;
    }
  };

  return (
    <Card>
      <CardContent
        sx={{
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              padding: "1rem",
              fontSize: "5rem",
              flex: 1,
            }}
          >
            {getCardIcon(ride.transportation.label)}
            <Typography variant="h6">{getFormatedDate(ride.date)}</Typography>
          </Stack>
          <div style={{ flex: 3 }}>
            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginBottom: "0.5rem" }}
              >
                {ride.label}
              </Typography>
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <Typography variant="body1">
                <strong>Moyen de transport:</strong> {ride.transportation.label}
              </Typography>
              <Typography variant="body1">
                <strong>Distance:</strong> {ride.distance} km
              </Typography>
              <Typography variant="body1">
                <strong>Émission CO2:</strong>{" "}
                {(ride.distance * ride.transportation.carboneEmission) / 1000}{" "}
                kg
              </Typography>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleModalComponent(
                  <DeleteRide
                    rideId={ride.id}
                    handleCloseModal={handleCloseModal}
                  />
                )
              }
              style={{
                margin: "0.5rem",
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RideCard;
