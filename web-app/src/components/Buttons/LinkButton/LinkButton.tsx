import { ReactNode } from 'react';
import { LinkButtonStyled } from './LinkButton.styled';
import BaseButton from '../BaseButton/BaseButton';

export default function LinkButton({
  color = 'PRIMARY',
  href,
  children,
}: {
  color?: 'PRIMARY' | 'SECONDARY';
  href: string;
  children: ReactNode;
}) {
  return (
    <LinkButtonStyled color={color} href={href}>
      <BaseButton color={color}>{children}</BaseButton>
    </LinkButtonStyled>
  );
}
