import { useState } from "react";
export type useContactFormHookParams = {
    defaultReportType?: string;
    defaultReportTopic?: string;
    defaultDescription?: string;
};


export type ContactFormHookReturn = {
    readonly reportType: string;
    readonly reportTopic: string;
    readonly description: string;
    readonly setReportType: (reportType: string) => void;
    readonly setReportTopic: (reportTopic: string) => void;
    readonly setDescription: (description: string) => void;
    readonly sendtoBackend: () => void;
    readonly submit: () => void;
    
};

export const useContactForm = (
    params?: useContactFormHookParams
    ): ContactFormHookReturn => {
        const { defaultReportType = "other", defaultReportTopic = "", defaultDescription = "" } = params || {};
        const [reportType, setReportType] = useState(defaultReportType);
        const [reportTopic, setReportTopic] = useState(defaultReportTopic);
        const [description, setDescription] = useState(defaultDescription);

        // ** Logic **//
        const sendtoBackend = () => {
            return;
        }
        const submit = () => {
            return;
        }
        
       
        return {
            reportType,
            reportTopic,
            description,
            setReportType,
            setReportTopic,
            setDescription,
            sendtoBackend,
            submit,
        } as const;
    };