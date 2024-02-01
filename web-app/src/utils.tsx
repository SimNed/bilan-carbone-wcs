export function removeQueryParameter(parameterToRemove: string) {
  const { protocol, host, pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  urlParams.delete(parameterToRemove);
  const newUrl = `${protocol}//${host}${pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

export const getDefaultUser = (): Record<string, string> => {
  return {id: "un_uuid_par_defaut", firstName: "John", lastName: 'Doe', email: "john.doe@mail.com", password: 'secret.password'}
}
