import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({ "name": "test" });
    const [userid, setUserid] = useState(0);

    const nonce = searchParams.get('nonce');
    console.log(nonce);
    // on mount, read search param 'nounce' and set it to state
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nonce: nonce })
        };
        const response = fetch(`http://127.0.0.1:5000/login`, requestOptions).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data); //data is user info et
            setLoggedIn(true);
            setData(data);
            // fetch(`http://127.0.0.1:5000/user_info`, { method: 'GET' }).then((response_user) => {
            //     return response_user.json();
            // }).then((data_user) => {
            //     console.log(data_user)
            //     setUserid(data_user['user_info'])
            // });
        });
    }, []);
    return (
        loggedIn ? <div>Logged in {data.name}</div> :
            <Skeleton variant="text" />
    )
};

export default Login;