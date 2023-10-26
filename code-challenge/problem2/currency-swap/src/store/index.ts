import { create } from "zustand";
import { Actions, State } from "./types";

const useStore = create<State & Actions>((set) => ({
  isError: false,
  msgError: "",
  setIsError: (isError: boolean, msgError: string) =>
    set((state) => ({ ...state, isError: isError, msgError: msgError })),
}));

export default useStore;
