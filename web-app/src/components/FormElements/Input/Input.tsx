import { InputStyled } from "./Input.styled"

export const Input = ({ type, label }: { type: string, label: string } ) => {
    return <InputStyled type={type} placeholder={label}/>
}