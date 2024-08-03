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
import { useModal } from "@/providers/ModalProvider";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpMutationVariables>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { handleModalComponent } = useModal();

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
    const newFieldErrors = {
      firstName: formData.firstName ? "" : "Le prénom est obligatoire.",
      lastName: formData.lastName ? "" : "Le nom de famille est obligatoire.",
      email: formData.email ? "" : "L'adresse email est obligatoire.",
      password: formData.password ? "" : "Le mot de passe est obligatoire.",
    };
    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some((error) => error !== "")) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!isEmailValid(formData.email)) {
      setError("L'adresse email n'est pas valide.");
      return;
    }

    if (formData.password.length < 12) {
      setError("Le mot de passe doit comporter au moins 12 caractères.");
      return;
    }
    setError(null);

    await signUpMutation({
      variables: formData,
      onCompleted: (data) => {
        if (data.signUp) {
          setTimeout(() => {
            handleModalComponent(<SignInForm />);
          }, 300);
        }
      },
      onError: (error) => {
        if (
          error.graphQLErrors.some((e: any) =>
            e.message.includes("duplicate key value violates unique constraint")
          )
        ) {
          setError("L'adresse email est déjà utilisée.");
          return;
        }
        setError("Une erreur s'est produite. Veuillez réessayer.");
      },
    });
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
              setFieldErrors({ ...fieldErrors, firstName: "" });
            }}
            error={!!fieldErrors.firstName}
            helperText={fieldErrors.firstName}
          />
          <TextField
            label="Nom de famille"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ lastName: event.target.value });
              setFieldErrors({ ...fieldErrors, lastName: "" });
            }}
            error={!!fieldErrors.lastName}
            helperText={fieldErrors.lastName}
          />
          <TextField
            label="Adresse Mail"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ email: event.target.value });
              setFieldErrors({ ...fieldErrors, email: "" });
            }}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            label="Mot de passe"
            size="small"
            type="password"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ password: event.target.value });
              setFieldErrors({ ...fieldErrors, password: "" });
            }}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
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
        <Link href="#" onClick={() => handleModalComponent(<SignInForm />)}>
          cliquez ici
        </Link>
      </p>
    </Container>
  );
};

export default SignUpForm;
