import { useState } from "react";
import { useRouter } from "next/router";
import { SignUpMutation, SignUpMutationVariables } from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { TextField } from "@/components/Input/Input";
import { Button, Container, Link, Typography } from "@mui/material";
import { SIGN_UP_FORM } from "@/api-gql/mutations/user.mutations";

interface SignUpPageProps {
  onToggleModalContent: () => void;
}

export default function SignUpPage({ onToggleModalContent }: SignUpPageProps) {
  const [formData, setFormData] = useState<SignUpMutationVariables>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const updateFormData = (
    partialFormData: Partial<SignUpMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };
  const [signUpMutation, { error }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP_FORM);

  const router = useRouter();

  const signUp = async () => {
    const { data } = await signUpMutation({ variables: formData });
    if (data && data.signUp) {
      setTimeout(() => {
        onToggleModalContent();
        router.push("/sign-in");
      }, 300);
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px",
        }}
      >
        <Typography variant="h5">Créer un compte</Typography>
        <form
          style={{ width: "100%", marginTop: "1rem" }}
          onSubmit={(event) => {
            event.preventDefault();
            signUp();
          }}
        >
          <Typography variant="body1">Prénom :</Typography>
          <TextField
            style={{ marginBottom: "1rem", width: "100%" }}
            onChange={(event) => {
              updateFormData({ firstName: event.target.value });
            }}
          />
          <Typography variant="body1">Nom :</Typography>
          <TextField
            style={{ marginBottom: "1rem", width: "100%" }}
            onChange={(event) => {
              updateFormData({ lastName: event.target.value });
            }}
          />
          <Typography variant="body1">Adresse email :</Typography>
          <TextField
            style={{ marginBottom: "1rem", width: "100%" }}
            onChange={(event) => {
              updateFormData({ email: event.target.value });
            }}
          />
          <Typography variant="body1">Mot de passe :</Typography>
          <TextField
            type="password"
            style={{ marginBottom: "1rem", width: "100%" }}
            onChange={(event) => {
              updateFormData({ password: event.target.value });
            }}
          />
          <div style={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
            >
              Créer un compte
            </Button>
          </div>
        </form>
        <Typography>
          Vous avez déjà un compte ?{" "}
          <Link href="#" onClick={onToggleModalContent}>
            cliquez ici
          </Link>
        </Typography>
      </Container>
    </>
  );
}
