import { CenteredContainerStyled } from "@/components/Containers/CenteredContainer.styled";
import Form from "@/components/FormElements/Form/Form";
import { FormTitle } from "@/components/FormElements/FormView/FormView.styled";
import { FormLabelWithField, TextField } from "@/components/Input/Input";
import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { LinkStyled } from "@/components/Link/StyledLink";

interface SignInPageProps {
  onToggleModalContent: () => void;
}

export default function SignInPage({ onToggleModalContent }: SignInPageProps) {
  return (
    <>
      <CenteredContainerStyled $width="80%">
        <FormTitle>Se connecter</FormTitle>
        <Form>
          <FormLabelWithField>
            Adresse email
            <TextField type="email" autoComplete="username" required />
          </FormLabelWithField>
          <FormLabelWithField>
            Mot de passe
            <TextField
              type="password"
              minLength={12}
              autoComplete="current-password"
              required
            />
          </FormLabelWithField>
          <BaseButton>Se connecter</BaseButton>
          <p>
            Vous n'avez pas de compte ?{" "}
            <LinkStyled onClick={onToggleModalContent}>
              Créer un compte
            </LinkStyled>
          </p>
        </Form>
      </CenteredContainerStyled>
    </>
  );
}
