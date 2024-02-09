import BaseButton from '@/components/Buttons/BaseButton/BaseButton';
import { FlexCenteredContainerStyled } from '@/components/Containers/FlexCenteredContainer.styled';
import Form from '@/components/FormElements/Form/Form';
import { Input } from '@/components/FormElements/Inputs/Input';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUpPage() {

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

  const router = useRouter();

  const [formData, setFormData] = useState<SignUpFormMutationVariables>({ email: "", firstName: "", lastName: "", password: "" });
  const updateFormData = (partialFormData: Partial<SignUpFormMutationVariables>) => { setFormData({ ...formData, ...partialFormData }) };
  const [signUpMutation, { loading, error }] = useMutation<SignUpFormMutation, SignUpFormMutationVariables>(SIGN_UP_FORM);

  const signUp = async () => {
    const { data } = await signUpMutation({ variables: formData });
    
        if (data && data.signUp) {
          router.push("/sign-in");
        }
      };

  return (
    <FlexCenteredContainerStyled $isColumn>
      <h1>Sign Up</h1>
      <Form onSubmit={((e) => {
        e.preventDefault()
        signUp()
      })}>
        <Input type='text' label='email' onChange={(e) => updateFormData({ email: e.target.value })}/>
        <Input type='text' label='first name' onChange={(e) => updateFormData({ firstname: e.target.value })}/>
        <Input type='text' label='last name' onChange={(e) => updateFormData({ lastName: e.target.value })}/>
        <Input type='text' label='password' onChange={(e) => updateFormData({ password: e.target.value })}/>
        <BaseButton>valider</BaseButton>
      </Form>
    </FlexCenteredContainerStyled>
  );
}


// export default function SignUpPage() {
//   const [formData, setFormData] = useState<SignUpFormMutationVariables>({
//     email: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//   });
//   const router = useRouter();

//   const updateFormData = (
//     partialFormData: Partial<SignUpFormMutationVariables>
//   ) => {
//     setFormData({ ...formData, ...partialFormData });
//   };

//   const [signUpMutation, { loading, error }] = useMutation<
//     SignUpFormMutation,
//     SignUpFormMutationVariables
//   >(SIGN_UP_FORM);

//   const signUp = async () => {
//     const { data } = await signUpMutation({
//       variables: formData,
//     });

//     if (data && data.signUp) {
//       router.push("/sign-in");
//     }
//   };

//   return (
//     <NarrowPageContainer>
//       <MainContentTitle>Inscription</MainContentTitle>
//       <Form
//         onSubmit={(event) => {
//           event.preventDefault();
//           signUp();
//         }}
//       >
//         <FormLabelWithField>
//           Adresse email
//           <TextField
//             type="email"
//             autoComplete="username"
//             required
//             onChange={(event) => {
//               updateFormData({ email: event.target.value });
//             }}
//           />
//         </FormLabelWithField>
//         <FormLabelWithField>
//           Prénom
//           <TextField
//             type="text"
//             required
//             onChange={(event) => {
//               updateFormData({ firstName: event.target.value });
//             }}
//           />
//         </FormLabelWithField>
//         <FormLabelWithField>
//           Nom
//           <TextField
//             type="text"
//             required
//             onChange={(event) => {
//               updateFormData({ lastName: event.target.value });
//             }}
//           />
//         </FormLabelWithField>
//         <FormLabelWithField>
//           Mot de passe
//           <TextField
//             type="password"
//             minLength={12}
//             autoComplete="new-password"
//             required
//             onChange={(event) => {
//               updateFormData({ password: event.target.value });
//             }}
//           />
//         </FormLabelWithField>
//         <PrimaryButton disabled={loading}>
//           {loading ? <Loader size="SMALL" onBackground={true} /> : "M'inscrire"}
//         </PrimaryButton>
//         {error && error.message}
//       </Form>
//     </NarrowPageContainer>
//   );
// }