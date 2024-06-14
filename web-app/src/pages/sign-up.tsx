import { useState } from "react";
import { SignUpMutation, SignUpMutationVariables } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SIGN_UP_FORM } from "@/api-gql/mutations/user.mutations";
import { useModal } from "@/components/Layout/Layout";

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpMutationVariables>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const { handleModalParams } = useModal();

  const updateFormData = (
    partialFormData: Partial<SignUpMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_FORM
  );

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUp = async () => {
    if (!isEmailValid(formData.email)) {
      setError("L'adresse email n'est pas valide.");
      return;
    }

    if (formData.password.length < 12) {
      setError("Le mot de passe doit comporter au moins 12 caractères.");
      return;
    }
    setError(null);
    try {
      const { data } = await signUpMutation({ variables: formData });
      if (data && data.signUp) {
        setTimeout(() => {
          handleModalParams({ content: "signIn" });
        }, 300);
      }
    } catch (error: any) {
      if (
        error.graphQLErrors.some((e: any) =>
          e.message.includes("duplicate key value violates unique constraint")
        )
      ) {
        setError("L'adresse email est déjà utilisée.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        p: 6,
      }}
    >
      <Typography variant="h5">S'inscrire</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signUp();
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <Stack spacing={2} my={6}>
          <TextField
            label="Prénom"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ firstName: event.target.value });
            }}
          />
          <TextField
            label="Password"
            size="small"
            type="password"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ lastName: event.target.value });
            }}
          />
          <TextField
            label="Adresse Mail"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ email: event.target.value });
            }}
          />
          <TextField
            label="Password"
            size="small"
            type="password"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ password: event.target.value });
            }}
          />
          {error && (
            <Typography color="error" style={{ marginBottom: "1rem" }}>
              {error}
            </Typography>
          )}
        </Stack>
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mb: 4 }}
          fullWidth
        >
          S'inscrire
        </Button>
      </form>
      <p style={{ padding: 0, margin: 0 }}>
        Vous avez déjà un compte ?{" "}
        <Link href="#" onClick={() => handleModalParams({ content: "signIn" })}>
          cliquez ici
        </Link>
      </p>
    </Container>
  );
}
{
}
