import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type Chakra } from "../data/chakras";

type ChakraGuideValue = {
  chakra: Chakra | null;
  isOpen: boolean;
  setChakra: Dispatch<SetStateAction<Chakra | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  chooseChakra: (c: Chakra) => void;
  toggleOpen: () => void;
};

const ChakraGuideContext = createContext<ChakraGuideValue | null>(null);

export function ChakraGuideProvider({ children }: { children: ReactNode }) {
  const [chakra, setChakra] = useState<Chakra | null>(null);
  const [isOpen, setOpen] = useState(false);

  const chooseChakra = useCallback((c: Chakra) => {
    setChakra(c);
    setOpen(true);
  }, []);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);

  return (
    <ChakraGuideContext.Provider
      value={{ chakra, isOpen, setChakra, setOpen, chooseChakra, toggleOpen }}
    >
      {children}
    </ChakraGuideContext.Provider>
  );
}

export function useChakraGuide(): ChakraGuideValue {
  const ctx = useContext(ChakraGuideContext);
  if (!ctx) {
    throw new Error("useChakraGuide must be used within a ChakraGuideProvider");
  }
  return ctx;
}
