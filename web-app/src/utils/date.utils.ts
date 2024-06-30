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

export function checkRideMonthAndYearEquality(
  rideDate: any,
  month: number,
  year: number
) {
  return (
    new Date(rideDate).getMonth() === month &&
    new Date(rideDate).getFullYear() === year
  );
}
