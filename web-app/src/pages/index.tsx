import { useAuth } from "@/providers/AuthProvider";
import SignInForm from "@/components/auth/SignInForm";
import { useModal } from "@/providers/ModalProvider";

import { DARK_GRAY_COLOR } from "@/styles/constants";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function HomePage() {
  const { user } = useAuth();
  const { handleModalComponent } = useModal();
  const router = useRouter();
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center" gap={4}>
      <Typography variant="h1">Bilan Carbone</Typography>
      <Typography variant="h5" color={DARK_GRAY_COLOR} align="center" px={2}>
        Calculer votre empreinte carbone et consulter les émissions de CO₂
      </Typography>
      <Grid
        container
        my={2}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Grid item xs={8} md={4} lg={3}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="success"
            onClick={() =>
              user
                ? router.push("./add-ride")
                : handleModalComponent(
                    <SignInForm
                      onValidationRedirectionPath="./add-ride"
                      subtitle="Pour ajouter une empreinte carbone vous devez d'abord vous connecter"
                    />
                  )
            }
          >
            Ajouter une dépense carbone
          </Button>
        </Grid>
        <Grid item xs={8} md={4} lg={3}>
          <Button
            sx={{ m: 0 }}
            variant="outlined"
            fullWidth
            size="large"
            color="success"
            onClick={() =>
              user
                ? router.push("./rides")
                : handleModalComponent(
                    <SignInForm
                      onValidationRedirectionPath="./rides"
                      subtitle="Pour votre votre empreinte carbone vous devez d'abord vous connecter"
                    />
                  )
            }
          >
            Voir mes dépenses carbone
          </Button>
        </Grid>
      </Grid>
      <img
        src="/images//world-snapshot.png"
        alt=" world snapshot"
        style={{ width: "40%" }}
      />
    </Stack>
  );
}
