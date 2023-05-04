export type ContactHookReturn = {
  submit: () => void;
};

export const useContact = (): ContactHookReturn => {
  const submit = () => {
    return;
  };

  return {
    submit,
  } as const;
};
