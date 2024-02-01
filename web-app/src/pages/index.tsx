import { FlexCenteredContainerStyled } from "@/components/Containers/FlexCenteredContainer.styled";
import Link from "next/link";

export default function HomePage() {
  return (
    <FlexCenteredContainerStyled $isColumn>
      <h1>Home</h1>
      <Link href={'./sign-in'}>s'inscrire</Link>
    </FlexCenteredContainerStyled>
  )
}
