import * as styled from "./Loader.styled";

export default function Loader({
  global = false,
  size = "REGULAR",
  onBackground = false,
}: {
  global?: boolean;
  size?: "SMALL" | "REGULAR";
  onBackground?: boolean;
}) {
  return global ? (
    <styled.GlobalLoaderWrapper>
      <styled.Loader $size={size} $onBackground={onBackground} />
    </styled.GlobalLoaderWrapper>
  ) : (
    <styled.Loader $size={size} $onBackground={onBackground} />
  );
}
