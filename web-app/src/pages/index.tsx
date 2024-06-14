import { useAuth } from "@/AuthProvider";
import SignInForm from "@/components/Auth/SignInForm";
import { useModal } from "@/components/Layout/Layout";
import { HEADER_HEIGHT, WHITE_COLOR } from "@/styles/constants";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function HomePage() {
  const { user } = useAuth();
  const { handleModalComponent } = useModal();
  const router = useRouter();
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
              variant="contained"
              size="large"
              color="success"
              onClick={() =>
                user
                  ? router.push("./carbonEmissionPage")
                  : handleModalComponent(
                      <SignInForm
                        onValidationRedirectionPath="./carbonEmissionPage"
                        subtitle="Pour ajouter une empreinte carbone vous devez d'abord vous connecter"
                      />
                    )
              }
            >
              Ajouter une dépense carbone
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="success"
              onClick={() =>
                user
                  ? router.push("./carbonEmissionPage")
                  : handleModalComponent(
                      <SignInForm
                        onValidationRedirectionPath="./carbonEmissionPage"
                        subtitle="Pour votre votre empreinte carbone vous devez d'abord vous connecter"
                      />
                    )
              }
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
