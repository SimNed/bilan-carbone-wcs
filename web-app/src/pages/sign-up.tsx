import { SIGN_UP_FORM } from "@/api-gql/mutations/user.mutations";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import { Form } from "@/components/FormElements/Form/Form.styled";
import { FormTitle } from "@/components/FormElements/FormView/FormView.styled";
import { FormLabelWithField, TextField } from "@/components/Input/Input";
import { LinkStyled } from "@/components/Link/StyledLink";
import { SignUpMutation, SignUpMutationVariables } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

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
      <CenteredContainerStyled $width="80%">
        <FormTitle>Créer un compte</FormTitle>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            signUp();
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
            Prénom
            <TextField
              type="text"
              required
              onChange={(event) => {
                updateFormData({ firstName: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Nom
            <TextField
              type="text"
              required
              onChange={(event) => {
                updateFormData({ lastName: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Mot de passe
            <TextField
              type="password"
              minLength={12}
              autoComplete="new-password"
              required
              onChange={(event) => {
                updateFormData({ password: event.target.value });
              }}
            />
          </FormLabelWithField>
          <BaseButton>Créer un compte</BaseButton>
          <p>
            Vous avez déjà un compte ?{" "}
            <LinkStyled onClick={onToggleModalContent}>Se connecter</LinkStyled>
          </p>
          {error && error.message}
        </Form>
      </CenteredContainerStyled>
    </>
  );
}
