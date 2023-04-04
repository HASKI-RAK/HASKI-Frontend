import { useSnackbarProvider as _useSnackbarProvider } from "./SnackbarProvider.hooks";
import { SnackbarContext, SnackbarContextType } from "@services";
import { SnackbarContainer } from "@components";

type SnackbarProviderProps = {
  children: React.ReactNode;
  useSnackbarProvider?: () => SnackbarContextType;
};

export const SnackbarProvider = ({
  useSnackbarProvider = _useSnackbarProvider,
  ...props
}: SnackbarProviderProps) => (
  <SnackbarContext.Provider value={useSnackbarProvider()}>
    <SnackbarContainer />
    {props.children}
  </SnackbarContext.Provider>
);

export default SnackbarProvider;
