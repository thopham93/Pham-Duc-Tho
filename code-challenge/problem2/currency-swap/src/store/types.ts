export type State = {
  isError: boolean;
  msgError: string;
};

export type Actions = {
  setIsError: (isError: boolean, msgError: string) => void;
};
