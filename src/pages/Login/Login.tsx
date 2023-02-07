import { LoginForm } from "@components";
import { useLoginForm } from "@hooks/*";
import { Skeleton } from "@mui/material";
import { AuthContext } from "@services/*";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
    const [searchParams] = useSearchParams();
    const [loggedIn, data, password, username, usernameError, passwordError,
        setLoggedInHandler, setDataHandler, setUsernameHandler,
            setPasswordHandler, setUsernameErrorHandler, setPasswordErrorHandler ] = useLoginForm();

    const navigate = useNavigate();
    const authcontext = useContext(AuthContext);
    const nonce = searchParams.get('nonce');

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPasswordHandler(event.target.value);
    }
    const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUsernameHandler(event.target.value);
    }


    // Login with username and password
    const onLoginHandler = () => {
        fetch(`http://fakedomain.com:5000/login_credentials`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username: "test", password: "test" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.statusText)
            .then((json) => {
                handleLogin();

            }).catch((err) => {
                console.log(err);
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
            .then((response) => response.json())
            .then((json) => {
                setLoggedInHandler(true);
                // to some sanity checks here
                // then supply data to auth context
                authcontext.setIsAuth(true);
                // then redirect to home page
                setDataHandler(json); // this is just for demo purposes
                navigate('/dashboard', { replace: true });
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        searchParams.get('nonce') ?
            loggedIn ? <div>Logged in as {data.user} with id {data.id}</div> :
                <Skeleton variant="rectangular" />
            :
            <LoginForm
                usernameDefault={username}
                usernameError={usernameError}
                passwordError={passwordError}
                onLogin={onLoginValidationHandler}
                onUsernameChange={usernameChangeHandler}
                onPasswordChange={passwordChangeHandler}
            />
    )
};

export default Login;