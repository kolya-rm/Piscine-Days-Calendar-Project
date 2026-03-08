const IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";

const DESCRIPTIONS_MAP = new Map();


 export async function setDescription(id, description) {
  DESCRIPTIONS_MAP.set(id, description);
  if (IS_BROWSER) {
    localStorage.setItem(id, description);
  }
}

export function getDescription(id) {
  if (DESCRIPTIONS_MAP.has(id)) {
    return DESCRIPTIONS_MAP.get(id);
  }
  if (IS_BROWSER) {
    return localStorage.getItem(id);
  }
  return null;
}

export function clearDescription(id) {
  DESCRIPTIONS_MAP.clear(id);
  if (IS_BROWSER) {
    localStorage.removeItem(id);
  }
}
