import { useContext, createContext } from "react";

export const ThemeContext = createContext(null)

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
    }
    return context;
}