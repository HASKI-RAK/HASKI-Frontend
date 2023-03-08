import { LoginForm } from "@components";
import { DefaultSkeleton as Skeleton } from "@common/components"
import { AuthContext } from "@services";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLogin as _useLogin, LoginHookParams, LoginHookReturn } from "./Login.hooks";

type LoginProps = {
    useLogin?: (params: LoginHookParams) => LoginHookReturn;
};

export const Login = ({ useLogin = _useLogin }: LoginProps) => {
    // UX state
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const authcontext = useContext(AuthContext);

    const nonce = searchParams.get('nonce') || undefined;

    // Application logic hooks
    const { onSubmit } = useLogin({ setIsLoading, nonce });

    return (
        nonce ? <Skeleton  /> :
            authcontext.isAuth ? <Skeleton /> :
                <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    )
};

export default Login;