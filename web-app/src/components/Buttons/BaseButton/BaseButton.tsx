import { ReactNode } from 'react';
import { BaseButtonStyled } from './BaseButton.styled';

export default function BaseButton({ onClick = () => {}, children }: { onClick?: () => void, children: ReactNode }) {
  return <BaseButtonStyled onClick={onClick}>{ children }</BaseButtonStyled>
}