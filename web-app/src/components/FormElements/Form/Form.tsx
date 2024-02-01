import { ReactNode } from "react"
import { FormStyled } from "./Form.styled"

const Form = ({ children }: { children: ReactNode }) => {
    return(
        <FormStyled>{children}</FormStyled>
    )
}

export default Form;