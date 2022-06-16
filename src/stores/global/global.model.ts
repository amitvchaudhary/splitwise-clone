export interface GlobalState {
  isLight: boolean;
}

export function createInitialState(): GlobalState {
  return {
    isLight: true
  };
}