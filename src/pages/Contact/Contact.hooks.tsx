export type ContactHookReturn={
    readonly onSubmit: () => void;

};

export const useContact = (): ContactHookReturn => {

    const onSubmitHandler = () => {
        
          return ;
      };
      return {
        onSubmit: onSubmitHandler,
        } as const;
}
