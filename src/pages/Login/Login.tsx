import { Skeleton } from "@mui/material";
import { AuthContext } from "@services/*";
import { stringify } from "querystring";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({ "user": "test", "id": -1 });

    const navigate = useNavigate();
    const authcontext = useContext(AuthContext);
    const nonce = searchParams.get('nonce');

    // on mount, read search param 'nounce' and set it to state
    useEffect(() => {
        const response = fetch(`http://fakedomain.com:5000/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ nonce: nonce }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setLoggedIn(true);
                // to some sanity checks here
                // then supply data to auth context
                authcontext.setIsAuth(true);
                // then redirect to home page
                setData(json); // this is just for demo purposes
                navigate('/dashboard', { replace: true });
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        searchParams.get('nonce') ?
            loggedIn ? <div>You will be redirected shortly...</div> :
                <Skeleton variant="text" />
            :
            <div>
                You are not authorized to view this page. Later here is login for admin
            </div>
    )
};

export default Login;