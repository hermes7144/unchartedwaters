import { createContext, useContext } from 'react';

export const InfoContext = createContext();

export function useInfoContext() {
  return useContext(InfoContext);
}
