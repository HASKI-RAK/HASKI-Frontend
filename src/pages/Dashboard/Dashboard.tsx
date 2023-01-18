import { AuthContext } from "@services/*";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const authcontext = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        authcontext.isAuth ?
            <div>
                Hello there!
                General Kenobi! You are a bold one!
                To home:
                <button onClick={() => navigate('/')}>Home</button>
                <br />
                <button onClick={() => authcontext.setIsAuth(false)}>Logout</button>
            </div>
            :
            <div>
                You are not authorized to view this page.
            </div>
    )
};

export default Dashboard;
