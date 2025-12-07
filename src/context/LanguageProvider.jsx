import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { dictionary } from "./dictionary";

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es')

    const text = dictionary[language]

    const [size, setSize] = useState('medium')

    const data = { language, setLanguage, text , size}


    return (
        <>
            <LanguageContext.Provider value={data}>
                {children}
            </LanguageContext.Provider>
        </>
    )
}