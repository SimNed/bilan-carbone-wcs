import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { SignInFormMutation, SignInFormMutationVariables } from "@/gql/graphql";
import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SIGN_IN_FORM } from "@/api-gql/mutations/user.mutations";

interface SignInPageProps {
  onToggleModalContent: () => void;
  closeModal: () => void;
}

// const GET_MY_PROFILE_SIGN_IN = gql`
//   query GetMyProfileSignIn {
//     myProfile {
//       id
//       initials
//     }
//   }
// `;

export default function SignInPage({
  onToggleModalContent,
  closeModal,
}: SignInPageProps) {
  const router = useRouter();

  // const { data, refetch } = useQuery<GetMyProfileSignInQuery>(
  //   GET_MY_PROFILE_SIGN_IN
  // );
  // useEffect(() => {
  //   if (data?.myProfile) {
  //     router.push("/profil");
  //   }
  // }, [data]);

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
    const { data } = await signInMutation({
      variables: formData,
      onCompleted(data) {
        router.push("/");
      },
    });
  };
  return (
    <>
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
        <FormControl
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
        </FormControl>
        <p style={{ padding: 0, margin: 0 }}>
          Si vous n'avez pas encore de compte,{" "}
          <Link href="#" onClick={onToggleModalContent}>
            cliquez ici
          </Link>
        </p>
      </Container>
    </>
  );
}
