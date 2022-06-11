export interface GlobalState {
  isLoading: boolean;
}

export function createInitialState(): GlobalState {
  return {
    isLoading: false,
  };
}