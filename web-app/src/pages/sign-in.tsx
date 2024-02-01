import Form from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";

export default function SignInPage() {

  return(
    <>
      <img src='' alt =''/>
      <div className="form-wrapper">
        <Form>
          <Input type="text" label="email" />
          <Input type="text" label="password" />
        </Form>
      </div>
    </>
  );
}
