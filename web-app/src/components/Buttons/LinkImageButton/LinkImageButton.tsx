import { ReactNode } from 'react';
import { LinkImageButtonStyled } from './LinkImageButton.styled';

export default function LinkImageButton({ href, src, alt }: { href: string, src: string, alt: string }) {
  return (
    <LinkImageButtonStyled href={href}>
            <img src={src} alt={alt} />
    </LinkImageButtonStyled>
  )
}