export function removeQueryParameter(parameterToRemove: string) {
  const { protocol, host, pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  urlParams.delete(parameterToRemove);
  const newUrl = `${protocol}//${host}${pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

export function formatDateToDisplay(date: string){
  let formatedDate = new Date(date)
  return `${formatedDate.getDate()}/${formatedDate.getMonth() + 1 < 10 ? '0' + (formatedDate.getMonth() + 1) : (formatedDate.getMonth() + 1)}/${formatedDate.getFullYear()} `
}

export function capitalizeFirstLetter(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDefaultUser = (): Record<string, any> => {
  return {id: "un_uuid_par_defaut", firstName: "John", lastName: 'Doe', email: "john.doe@mail.com", password: 'secret.password', rides: [
    {
      "label": "Voyage en Italie",
      "distance": 807,
      "date": "2017-11-20T16:30:15+05:30",
      "transportationId": 1
    },{
      "label": "Voyage en Ardèche",
      "distance": 556,
      "date": "2016-01-20T07:30:15+05:30",
      "transportationId":2
    },{
      "label": "Voyage en Chine",
      "distance": 5783,
      "date": "2018-02-20T11:30:15+05:30",
      "transportationId": 3
    },{
      "label": "Voyage en Corse",
      "distance": 739,
      "date": "2020-05-20T05:30:15+05:30",
      "transportationId": 4
    },
  ]}
}
