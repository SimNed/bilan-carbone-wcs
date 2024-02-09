import { ReactNode } from "react"
import { FormStyled } from "./Form.styled"

const Form = ({ children, onSubmit }: { children :ReactNode; onSubmit: (event: React.FormEvent<HTMLInputElement>) => void }) => {
    return(
        <FormStyled onSubmit={onSubmit}>{children}</FormStyled>
    )
}

export default Form;