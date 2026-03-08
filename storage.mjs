export function setData(id, data) {
  localStorage.setItem(id, data);
}

export function getData(id) {
  return localStorage.getItem(id);
}

export function clearData(id) {
  localStorage.removeItem(id);
}
