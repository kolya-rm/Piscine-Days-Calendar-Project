const isNode = typeof process !== "undefined" && process.versions && process.versions.node;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

export function setDescription(id, description) {
  if (isBrowser) {
    localStorage.setItem(id, description);
  }
}

export function getDescription(id) {
  if (isBrowser) {
    return localStorage.getItem(id);
  }
}

export function clearDescription(id) {
  if (isBrowser) {
    localStorage.removeItem(id);
  }
}
