export const SET_DOT = "SET_DOT";
export const CLEAR_PROGRESS = "CLEAR_PROGRESS";

export function clearProgress() {
  return { type: CLEAR_PROGRESS };
}

export function setDot(bool) {
  return {
    type: SET_DOT,
    dot: bool,
  };
}
