import { Skeleton } from "@mui/material";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({ "user": "test", "id": -1 });

    const nonce = searchParams.get('nonce');
    console.log(nonce);
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
                fetch(`http://fakedomain.com:5000/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => response.json()).then((json) => {
                        setData(json);
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        loggedIn ? <div>Logged in {data.user} with id {data.id}</div> :
            <Skeleton variant="text" />
    )
};

export default Login;