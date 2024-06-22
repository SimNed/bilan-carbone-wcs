import { formatDateToDisplay } from "@/utils";

import { Card, CardContent, Typography, Button } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import FlightIcon from "@mui/icons-material/Flight";
import { useModal } from "@/components/Layout/Layout";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteRide from "./DeleteRide";

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
        style={{
          padding: "1rem",
          display: "flex",
        }}
      >
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            fontSize: "5rem",
          }}
        >
          {getCardIcon(ride.transportation.label)}
          <Typography variant="h6">{formatDateToDisplay(ride.date)}</Typography>
        </div>
        <div>
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
              {(ride.distance * ride.transportation.carboneEmission) / 1000} kg
            </Typography>
          </div>
          <Button
            variant="contained"
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
      </CardContent>
    </Card>
  );
};

export default RideCard;
