import { LoginForm } from "@components";
import { Skeleton } from "@mui/material";
import { AuthContext } from "@services/*";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const authcontext = useContext(AuthContext);
    const nonce = searchParams.get('nonce');

    const login = () => {
        // supply auth context
        authcontext.setIsAuth(true);
        // then redirect to home page
        navigate('/dashboard', { replace: true });
    }


    // Login with username and password
    const onSubmitHandler = () => {
        setIsLoading(true);
        fetch(`http://fakedomain.com:5000/login_credentials`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username: "test", password: "test" }),
            headers: {
                'Content-Type': 'application/text'
            }
        })
            .then((response) => response.statusText)
            .then((text) => {
                if (text === "OK") {
                    login();
                }
            }).catch(() => {
                //snackbar
            }).finally(() => {
                setIsLoading(false);
            });
    };


    // on mount, read search param 'nounce' and set it to state
    useEffect(() => {
        fetch(`http://fakedomain.com:5000/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ nonce: nonce }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.statusText)
            .then((text) => {
                if (text === "OK") {
                    login();
                }
            }).catch(() => {
                //snackbar
            });
    }, []);
    return (
        authcontext.isAuth ? <>{navigate('/dashboard', { replace: true })}</> :
            searchParams.get('nonce') ?
                <Skeleton variant="rectangular" />
                :
                <LoginForm onSubmit={onSubmitHandler} isLoading={isLoading} />
    )
};

export default Login;