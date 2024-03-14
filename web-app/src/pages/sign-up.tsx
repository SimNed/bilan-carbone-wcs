import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import { Form } from "@/components/FormElements/Form/Form.styled";
import { FormTitle } from "@/components/FormElements/FormView/FormView.styled";
import { FormLabelWithField, TextField } from "@/components/Input/Input";
import { LinkStyled } from "@/components/Link/StyledLink";

interface SignUnPageProps {
  onToggleModalContent: () => void;
}

export default function SignUpPage({ onToggleModalContent }: SignUnPageProps) {
  return (
    <>
      <CenteredContainerStyled $width="80%">
        <FormTitle>Créer un compte</FormTitle>
        <Form>
          <FormLabelWithField>
            Adresse email
            <TextField type="email" autoComplete="username" required />
          </FormLabelWithField>
          <FormLabelWithField>
            Prénom
            <TextField type="text" required />
          </FormLabelWithField>
          <FormLabelWithField>
            Nom
            <TextField type="text" required />
          </FormLabelWithField>
          <FormLabelWithField>
            Mot de passe
            <TextField
              type="password"
              minLength={12}
              autoComplete="new-password"
              required
            />
          </FormLabelWithField>
          <BaseButton>Créer un compte</BaseButton>
          <p>
            Vous avez déjà un compte ?{" "}
            <LinkStyled onClick={onToggleModalContent}>Se connecter</LinkStyled>
          </p>
        </Form>
      </CenteredContainerStyled>
    </>
  );
}
