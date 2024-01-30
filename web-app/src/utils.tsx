export function removeQueryParameter(parameterToRemove: string) {
  const { protocol, host, pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  urlParams.delete(parameterToRemove);
  const newUrl = `${protocol}//${host}${pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
