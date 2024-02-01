import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Form } from "@/components/FormElements/Form/Form";
import {
  FormLabelWithField,
  TextField,
} from "@/components/FormElements/Input/Input";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import {
  NarrowPageContainer,
  PageContainer,
} from "@/components/PageContainer/PageContainer";
import { SignUpFormMutation, SignUpFormMutationVariables } from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const SIGN_UP_FORM = gql`
  mutation SignUpForm(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
      email
      firstName
      lastName
    }
  }
`;

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormMutationVariables>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const router = useRouter();

  const updateFormData = (
    partialFormData: Partial<SignUpFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signUpMutation, { loading, error }] = useMutation<
    SignUpFormMutation,
    SignUpFormMutationVariables
  >(SIGN_UP_FORM);

  const signUp = async () => {
    const { data } = await signUpMutation({
      variables: formData,
    });

    if (data && data.signUp) {
      router.push("/sign-in");
    }
  };

  return (
    <NarrowPageContainer>
      <MainContentTitle>Inscription</MainContentTitle>
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
        <PrimaryButton disabled={loading}>
          {loading ? <Loader size="SMALL" onBackground={true} /> : "M'inscrire"}
        </PrimaryButton>
        {error && error.message}
      </Form>
    </NarrowPageContainer>
  );
}
