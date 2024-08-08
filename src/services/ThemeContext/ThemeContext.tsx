import React, {createContext, useContext, useState, ReactNode , FC} from "react"
import {HaskiTheme, DarkTheme, Theme} from '@common/utils'
import {ThemeProvider} from "@common/theme";

import {postUserSettings} from "../Theme/postUserSettings";
import {usePersistedStore} from "@store";

interface ThemeContextType {
    theme: typeof Theme;
    loadTheme: (themeName: string) => void;
    updateTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType|undefined>(undefined)

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};

interface ThemeContextProviderProps {
    children: ReactNode;
}



const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState(HaskiTheme)
    const [isUnset, setIsUnset] = useState(true)
    const getUser = usePersistedStore((state) => state.getUser)
    const updateUser = usePersistedStore((state) => state.updateUser)

    if (isUnset){
        getUser().then((user) => {
            if(user) {
                loadTheme(user.settings.theme)
            }
        })
        setIsUnset(false)
    }


    const updateTheme = (themeName: string) => {

        loadTheme(themeName)

        getUser().then((user) => {
            if(user) {
                postUserSettings(themeName, user.settings.user_id, user.lms_user_id)
                updateUser( user.settings.user_id, user.lms_user_id, themeName )
            }
        })
    }
    const loadTheme = (themeName: string) => {
        switch (themeName) {
            case 'light':
                setTheme(Theme);
                break;
            case 'dark':
                setTheme(DarkTheme);
                break;
            default:
                setTheme(HaskiTheme);
                break;
        }
    }

    return (
        <ThemeContext.Provider value={{theme, updateTheme, loadTheme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
export default ThemeContextProvider

