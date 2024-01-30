import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextField,
} from "@/components/FormElements/Input/Input";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { NarrowPageContainer } from "@/components/PageContainer/PageContainer";
import { SignInFormMutation, SignInFormMutationVariables } from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

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

export default function SignInPage() {
  const [formData, setFormData] = useState<SignInFormMutationVariables>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const updateFormData = (
    partialFormData: Partial<SignInFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signInMutation, { loading, error }] = useMutation<
    SignInFormMutation,
    SignInFormMutationVariables
  >(SIGN_IN_FORM);

  const signIn = async () => {
    const { data } = await signInMutation({
      variables: formData,
    });

    if (data && data.signIn) {
      router.push("/");
    }
  };

  return (
    <NarrowPageContainer>
      <MainContentTitle>Connexion</MainContentTitle>
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
            autoComplete="current-password"
            required
            onChange={(event) => {
              updateFormData({ password: event.target.value });
            }}
          />
        </FormLabelWithField>
        <PrimaryButton disabled={loading}>
          {loading ? (
            <Loader size="SMALL" onBackground={true} />
          ) : (
            "Me connecter"
          )}
        </PrimaryButton>
        {error && error.message}
      </Form>
    </NarrowPageContainer>
  );
}
