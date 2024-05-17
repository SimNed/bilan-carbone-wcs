import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { TextField } from "@/components/Input/Input";
import { SignInFormMutation, SignInFormMutationVariables } from "@/gql/graphql";
import { Button, Container, Link, Typography } from "@mui/material";
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
    });

    if (data && data.signIn) {
      // refetch();
      router.push("/");
      closeModal();
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
    </>
  );
}
