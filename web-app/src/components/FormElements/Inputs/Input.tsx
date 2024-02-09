import { InputStyled } from './FormInputs';

export const Input = ({ type, label, onChange }: { type: string; label: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return <InputStyled type={type} placeholder={label} onChange={onChange}/>;
};
