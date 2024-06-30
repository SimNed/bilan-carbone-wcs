import { css } from "styled-components";

// Colors

export const PRIMARY_COLOR = "#2a9d8f";
export const SECONDARY_COLOR = "#669bbc";
export const SUCCESS_COLOR = "#2a9d8f";
export const WARNING_COLOR = "#e9c46a";
export const ERROR_COLOR = "#e76f51";
export const INFO_COLOR = "#8ecae6";

export const BLACK_COLOR = "#264653";
export const GRAY_COLOR = "#c5c5c5";
export const WHITE_COLOR = "#f5f5f5";

export const CARBONE_COLOR_CODE_1 = "#b5e48c";
export const CARBONE_COLOR_CODE_2 = "#99d98c";
export const CARBONE_COLOR_CODE_3 = "#76c893 ";
export const CARBONE_COLOR_CODE_4 = "#52b69a";
export const CARBONE_COLOR_CODE_5 = "#34a0a4";
export const CARBONE_COLOR_CODE_6 = "#168aad";
export const CARBONE_COLOR_CODE_7 = "#1a759f";
export const CARBONE_COLOR_CODE_8 = "#1e6091";
export const CARBONE_COLOR_CODE_9 = "#184e77";
export const CARBONE_COLOR_CODE_NO_DATA = "#ccc";

export const TRAIN_COLOR_CODE = CARBONE_COLOR_CODE_1;
export const BUS_COLOR_CODE = CARBONE_COLOR_CODE_4;
export const CAR_COLOR_CODE = CARBONE_COLOR_CODE_6;
export const PLANE_COLOR_CODE = CARBONE_COLOR_CODE_9;

export const TRANSPARENT_BACKGROUND = css`
  background-color: black;
  opacity: 0.5;
`;

// Typos

export const BASE_FONT_FAMILY = "Poppins";
export const TITLE_FONT_FAMILY = "Nunito Sans";

// Border

export const BASE_BORDER = `1px solid ${GRAY_COLOR}`;
