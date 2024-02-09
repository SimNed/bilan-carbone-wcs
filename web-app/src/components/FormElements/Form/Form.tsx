import { FormEventHandler, ReactNode } from "react"
import { FormStyled } from "./Form.styled"

const Form = ({ children, onSubmit }: { children :ReactNode; onSubmit: FormEventHandler<HTMLFormElement> }) => {
    return(
        <FormStyled onSubmit={onSubmit}>{children}</FormStyled>
    )
}

export default Form;