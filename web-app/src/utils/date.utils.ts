export function getDateFormatedForDisplay(date: string) {
  const formatedDate = new Date(date);
  const formatedDateDay = formatedDate.getDate();
  const formatedDateMonth = formatedDate.getMonth();

  return `${formatedDateDay < 10 ? "0" : ""}${formatedDateDay}/${
    formatedDateMonth + 1 < 10 ? "0" : ""
  }${formatedDateMonth}/${formatedDate.getFullYear()}`;
}

export function getDateFormatedInISO8601(date: string) {
  const formatedDate = new Date(date);
  const formatedDateDay = `0${formatedDate.getDate()}`.slice(-2);
  const formatedDateMonth = `0${formatedDate.getMonth() + 1}`.slice(-2);
  const formatedDateYear = formatedDate.getFullYear();

  return `${formatedDateYear}-${formatedDateMonth}-${formatedDateDay}`;
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
