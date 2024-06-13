import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { TextField } from "@/components/Input/Input";
import {
  SignInFormMutation,
  SignInFormMutationVariables,
  User,
} from "@/gql/graphql";
import { Button, Container, Link, Typography } from "@mui/material";
import { SIGN_IN_FORM } from "@/api-gql/mutations/user.mutations";
import { useAuth } from "@/AuthProvider";

interface SignInPageProps {
  onToggleModalContent: () => void;
  closeModal: () => void;
}

export default function SignInPage({
  onToggleModalContent,
  closeModal,
}: SignInPageProps) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<SignInFormMutationVariables>({
    email: "",
    password: "",
  });

  const updateFormData = (
    partialFormData: Partial<SignInFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signInMutation, { error }] = useMutation<
    SignInFormMutation,
    SignInFormMutationVariables
  >(SIGN_IN_FORM);

  const signIn = async () => {
    try {
      const { data } = await signInMutation({
        variables: formData,
        onCompleted(data) {
          if (data?.signIn) {
            const user: User = data.signIn;
            setUser(user);
            closeModal();
            router.push("/");
          }
        },
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
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
      <Typography variant="h5">Se connecter</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signIn();
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
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
            Se connecter
          </Button>
        </div>
      </form>
      <Typography>
        Si vous n'avez pas encore de compte,{" "}
        <Link href="#" onClick={onToggleModalContent}>
          cliquez ici
        </Link>
      </Typography>
    </Container>
  );
}
