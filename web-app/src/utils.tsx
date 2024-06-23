import {
  CARBONE_COLOR_CODE_1,
  CARBONE_COLOR_CODE_2,
  CARBONE_COLOR_CODE_3,
  CARBONE_COLOR_CODE_4,
  CARBONE_COLOR_CODE_5,
  CARBONE_COLOR_CODE_6,
  CARBONE_COLOR_CODE_7,
  CARBONE_COLOR_CODE_8,
  CARBONE_COLOR_CODE_9,
} from "./styles/constants";

export function removeQueryParameter(parameterToRemove: string) {
  const { protocol, host, pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  urlParams.delete(parameterToRemove);
  const newUrl = `${protocol}//${host}${pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

// DATE

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getCarboneEmissionColorCode = (carboneEmission: number) => {
  if (carboneEmission > 0 && carboneEmission <= 0.1) {
    return CARBONE_COLOR_CODE_1;
  } else if (carboneEmission > 0.1 && carboneEmission <= 0.2) {
    return CARBONE_COLOR_CODE_2;
  } else if (carboneEmission > 0.2 && carboneEmission <= 0.5) {
    return CARBONE_COLOR_CODE_3;
  } else if (carboneEmission > 0.5 && carboneEmission <= 1) {
    return CARBONE_COLOR_CODE_4;
  } else if (carboneEmission > 1 && carboneEmission <= 2) {
    return CARBONE_COLOR_CODE_5;
  } else if (carboneEmission > 2 && carboneEmission <= 5) {
    return CARBONE_COLOR_CODE_6;
  } else if (carboneEmission > 5 && carboneEmission <= 10) {
    return CARBONE_COLOR_CODE_7;
  } else if (carboneEmission > 10 && carboneEmission <= 20) {
    return CARBONE_COLOR_CODE_8;
  } else {
    return CARBONE_COLOR_CODE_9;
  }
};
