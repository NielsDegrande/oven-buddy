import { createContext } from "react";
import { OvenContextValue } from "@/hooks/useOven";

export const OvenContext = createContext<OvenContextValue | undefined>(undefined); 
