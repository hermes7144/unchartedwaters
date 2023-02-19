import { createContext, useContext, useState } from 'react';

export const InvestContext = createContext();

export function InvestContextProvider({ children }) {
  const [target, setTarget] = useState();
  const [current, setCurrent] = useState();

  return <InvestContext.Provider value={{ target, current, setCurrent, setTarget }}>{children}</InvestContext.Provider>;
}

export function useInvestContext() {
  return useContext(InvestContext);
}
