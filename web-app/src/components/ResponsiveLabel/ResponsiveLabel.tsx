import { ReactNode } from "react";
import {
  DesktopLabelWrapper,
  MobileLabelWrapper,
} from "./ResponsiveLabel.styled";

export default function ResponsiveLabel({
  mobileLabel,
  desktopLabel,
}: {
  mobileLabel: ReactNode;
  desktopLabel: ReactNode;
}) {
  return (
    <>
      <MobileLabelWrapper>{mobileLabel}</MobileLabelWrapper>
      <DesktopLabelWrapper>{desktopLabel}</DesktopLabelWrapper>
    </>
  );
}
