import { ReactNode } from 'react';
import { LinkButtonStyled } from './LinkButton.styled';
import BaseButton from '../BaseButton/BaseButton';

export default function LinkButton({ href, children }: { href: string, children: ReactNode }) {
  return (
    <LinkButtonStyled href={href}>
        <BaseButton>
            {children}
        </BaseButton>
    </LinkButtonStyled>
  )
}