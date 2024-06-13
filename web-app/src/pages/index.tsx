import { HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import { Box, Button, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <div
        style={{
          width: "100%",
          background: WHITE_COLOR,
          height: `calc(100vh - ${HEADER_HEIGHT})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h1">Bilan Carbone</Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#8d99ae",
              fontFamily: "Poppins",
              fontSize: "1.2rem",
              fontWeight: "300",
            }}
          >
            Calculer votre empreinte carbone et consulter les émissions de CO₂
          </Typography>
          <Box
            m={6}
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Button
              href="./carbonEmissionPage"
              variant="contained"
              size="large"
              color="success"
            >
              Ajouter une dépense carbone
            </Button>
            <Button
              href="./profil"
              variant="outlined"
              size="large"
              color="success"
            >
              Voir mes dépenses carbone
            </Button>
          </Box>
          <img
            src="/images//world-snapshot.png"
            alt=" world snapshot"
            style={{ width: "40%" }}
          />
        </div>
      </div>
    </>
  );
}
