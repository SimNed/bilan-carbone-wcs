import { ButtonLikeLink } from "../Link/ButtonLikeLink";
import { MailIcon } from "../Icons/MailIcon";

import * as styled from "./ArticleDetails.styled";
import { Separator } from "../Separator/Separator";
import { Ad, GetAdQuery } from "@/gql/graphql";

export default function ArticleDetails({
  id,
  title,
  price,
  description,
  owner,
  createdAt,
}: GetAdQuery["ad"]) {
  return (
    <>
      <h2>{title}</h2>
      <styled.Container>
        <styled.ImageContainer>
          <styled.Image src={`/images/${id}.webp`} />
        </styled.ImageContainer>
        <styled.Info>
          <styled.Price>{price} €</styled.Price>
          <div>{description}</div>
          <Separator />
          <div>
            Annoncée publiée par{" "}
            <b>
              {owner.firstName} {owner.lastName}
            </b>
            .
          </div>
          <ButtonLikeLink href={`mailto:${owner.email}`}>
            <MailIcon />
            Envoyer un email
          </ButtonLikeLink>
        </styled.Info>
      </styled.Container>
    </>
  );
}
