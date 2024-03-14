import { ReactNode } from "react";
import { LinkButtonStyled } from "./LinkButton.styled";
import BaseButton from "../BaseButton/BaseButton";

export default function LinkButton({
  color = "PRIMARY",
  href = "",
  onClick,
  children,
}: {
  color?: "PRIMARY" | "SECONDARY";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <LinkButtonStyled color={color} href={href} onClick={onClick}>
      <BaseButton color={color}>{children}</BaseButton>
    </LinkButtonStyled>
  );
}
