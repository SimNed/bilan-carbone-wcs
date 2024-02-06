import { ReactNode } from 'react';
import { FormViewStyled } from './FormView.styled';

const FormView = ({ children }: { children: ReactNode }) => {
  return <FormViewStyled>{children}</FormViewStyled>;
};

export default FormView;
