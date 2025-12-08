import { useContext, createContext } from "react";

export const LanguageContext = createContext(null)

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useTheme debe ser usado dentro de un LanguageProvider");
    }
    return context;
}