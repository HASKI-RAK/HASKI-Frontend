
export type useContactFormHookParams = {
    defaultWidth?:string;
};

export type ContactFormHookReturn = {
    readonly sendtoBackend: () => void;
    width: string;
};

export const useContactForm = (
    params?: useContactFormHookParams
    ): ContactFormHookReturn => {
        
        // ** Logic **//
        const sendtoBackend = () => {
            return;
        };

        const { defaultWidth = "50%"} = params || {};
       
        return{
            sendtoBackend,
            width: defaultWidth,
        } as const;
    };