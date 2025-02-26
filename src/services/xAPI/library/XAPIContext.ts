import { createContext } from "react"
import { setupXAPI, XAPI } from "./setupXAPI"



export const XAPIContext = createContext<XAPI | null>(null)


/*
    setupXAPI({
        currentLanguage: '',
        projectURL: '',
        projectVersion: '',
        repositories: {
            component: '',
            page: '',
            verb: ''
        },
        xAPI: {
            auth: {
                username: '',
                password: ''
            },
            endpoint: '',
            version: '1.0.3',
        }
    })
        */