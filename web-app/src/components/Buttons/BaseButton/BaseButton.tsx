import { ReactNode } from 'react';
import { BaseButtonStyled } from './BaseButton.styled';

export default function BaseButton({
  color = 'PRIMARY',
  onClick = () => {},
  children,
}: {
  color?: 'PRIMARY' | 'SECONDARY';
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <BaseButtonStyled $color={color} onClick={onClick}>
      {children}
    </BaseButtonStyled>
  );
}
