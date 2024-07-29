import { createContext, PropsWithChildren, RefObject, useRef } from "react";

interface MyContextType {
  containerRef: RefObject<HTMLDivElement> | null;
}

export const MyContext = createContext<MyContextType>({ containerRef: null });

const GlobalContext = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <MyContext.Provider value={{ containerRef }}>{children}</MyContext.Provider>
  );
};

export default GlobalContext;
