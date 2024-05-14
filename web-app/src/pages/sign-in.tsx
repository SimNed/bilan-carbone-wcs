import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import { Form } from "@/components/FormElements/Form/Form.styled";
import { FormTitle } from "@/components/FormElements/FormView/FormView.styled";
import { FormLabelWithField, TextField } from "@/components/Input/Input";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { LinkStyled } from "@/components/Link/StyledLink";
import { useRouter } from "next/router";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { SignInFormMutation, SignInFormMutationVariables } from "@/gql/graphql";

interface SignInPageProps {
  onToggleModalContent: () => void;
  closeModal: () => void;
}

const SIGN_IN_FORM = gql`
  mutation SignInForm($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      firstName
      lastName
    }
  }
`;

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
      <CenteredContainerStyled $width="80%">
        <FormTitle>Se connecter</FormTitle>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            signIn();
          }}
        >
          <FormLabelWithField>
            Adresse email
            <TextField
              type="email"
              autoComplete="username"
              required
              onChange={(event) => {
                updateFormData({ email: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Mot de passe
            <TextField
              type="password"
              minLength={12}
              autoComplete="current-password"
              required
              onChange={(event) => {
                updateFormData({ password: event.target.value });
              }}
            />
          </FormLabelWithField>
          <BaseButton>Se connecter</BaseButton>
          <p>
            Vous n'avez pas de compte ?{" "}
            <LinkStyled onClick={onToggleModalContent}>
              Créer un compte
            </LinkStyled>
          </p>
          {error && error.message}
        </Form>
      </CenteredContainerStyled>
    </>
  );
}
