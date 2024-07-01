import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  SignInFormMutation,
  SignInFormMutationVariables,
  User,
} from "@/gql/graphql";
import {
  Button,
  Container,
  Link,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { SIGN_IN_FORM } from "@/api-gql/mutations/user.mutations";
import { useAuth } from "@/AuthProvider";
import { useModal } from "@/components/layout/Layout";
import SignUpForm from "./SignUpForm";

interface SignInPageProps {
  subtitle?: string;
  onValidationRedirectionPath?: string;
}

export default function SignInForm({
  subtitle,
  onValidationRedirectionPath,
}: SignInPageProps) {
  const router = useRouter();
  const { setUser } = useAuth();
  const { handleCloseModal, handleModalComponent } = useModal();
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
            handleCloseModal();
            router.push(onValidationRedirectionPath || "/");
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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        p: 6,
      }}
    >
      <Typography variant="h5">Se connecter</Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signIn();
        }}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <Stack spacing={2} my={6}>
          <TextField
            required
            label="Adresse mail"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ email: event.target.value });
            }}
          />
          <TextField
            required
            label="Password"
            size="small"
            type="password"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => {
              updateFormData({ password: event.target.value });
            }}
          />
        </Stack>
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mb: 4 }}
          fullWidth
        >
          Se connecter
        </Button>
      </form>
      <p style={{ padding: 0, margin: 0 }}>
        Si vous n'avez pas encore de compte,{" "}
        <Link href="#" onClick={() => handleModalComponent(<SignUpForm />)}>
          cliquez ici
        </Link>
      </p>
    </Container>
  );
}
