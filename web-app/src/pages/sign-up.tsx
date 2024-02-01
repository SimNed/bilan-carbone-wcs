import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";
import Form from "@/components/FormElements/Form/Form";
import { Input } from "@/components/FormElements/Input/Input";

export default function SignUpPage() {

  return(
    <FlexCenteredContainerStyled $isColumn>
        <h1>Sign Up</h1>
        <Form>
          <Input type="text" label="email" />
          <Input type="text" label="password" />
        </Form>
    </FlexCenteredContainerStyled>
  );
}
