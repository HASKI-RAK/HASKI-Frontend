
export type useContactformHookParams = {
    defaultWidth?:string;
};

export type ContactformHookReturn = {
    readonly sendtoBackend: () => void;
    width: string;
};

export const useContactform = (
    params?: useContactformHookParams
    ): ContactformHookReturn => {
        
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