import { LoginForm } from "@components";
import { Skeleton } from "@mui/material";
import { AuthContext } from "@services";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useLogin as _useLogin,
  LoginHookParams,
  LoginHookReturn,
} from "./Login.hooks";

/**
 * @typedef {Object} LoginProps
 * Props for the Login page.
 * @param useLogin - The login logic hook.
 */
type LoginProps = {
  useLogin?: (params: LoginHookParams) => LoginHookReturn;
};

/**
 * Login presents a login page. It uses the LoginForm component to present the form.
 *
 * @remarks
 * The nonce is passed by the LTI provider and is used to authenticate the user.
 * If the user is already authenticated, the page redirects to the home page.
 * This is done in the useLogin hook.
 *
 * @param props - Props containing the login logic.
 * @returns {JSX.Element} - The Login component.
 *
 * @category Pages
 */
export const Login = ({ useLogin = _useLogin }: LoginProps) => {
  // UX state
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const authcontext = useContext(AuthContext);

  const nonce = searchParams.get("nonce") || undefined;

  // Application logic hooks
  const { onSubmit } = useLogin({ setIsLoading, nonce });

  return nonce ? (
    <Skeleton />
  ) : authcontext.isAuth ? (
    <Skeleton />
  ) : (
    <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
  );
};

export default Login;
