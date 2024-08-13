export function getFormatedDate(date: string) {
  let formatedDate = new Date(date);
  return `${formatedDate.getDate()}/${
    formatedDate.getMonth() + 1 < 10
      ? "0" + (formatedDate.getMonth() + 1)
      : formatedDate.getMonth() + 1
  }/${formatedDate.getFullYear()} `;
}

export function getMonthWithId(id: number) {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return months[id];
}

export function getShortMonthWithId(id: number) {
  const months = [
    "jan",
    "fév",
    "mars",
    "avr",
    "mai",
    "juin",
    "juil",
    "août",
    "sep",
    "oct",
    "nov",
    "déc",
  ];
  return months[id];
}
