import React, {createContext, useContext, useState, ReactNode , FC} from "react"
import {HaskiTheme, DarkTheme, AltTheme} from '@common/utils'
import {ThemeProvider} from "@common/theme";

import {postUserSettings} from "../Theme/postUserSettings";
import {usePersistedStore} from "@store";

interface ThemeContextType {
    theme: typeof HaskiTheme;
    loadTheme: (themeName: string) => void;
    updateTheme: (themeName: string) => void;
}

/** ThemeContext provides access to a selected theme for its children
 *
 * @remarks
 * Rolled out in {@link pages.App | App} for app wide access
 * Posts preferred theme to DB and local storage on confirmation
 */

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

    //Sets rolled out theme
    const loadTheme = (themeName: string) => {
        switch (themeName) {
            case 'AltTheme':
                setTheme(AltTheme);
                break;
            case 'DarkTheme':
                setTheme(DarkTheme);
                break;
            default:
                setTheme(HaskiTheme);
                break;
        }
    }

    //sets rolled out theme and posts it to DB and local storage
    const updateTheme = (themeName: string) => {

        loadTheme(themeName)

        getUser().then((user) => {
            if(user) {
                postUserSettings(themeName, user.settings.user_id, user.lms_user_id)
                updateUser( user.settings.user_id, user.lms_user_id, themeName )
            }
        })
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

