import { DropdownLanguage, Text } from "@components"
import { DefaultButton as Button } from "@common/components"
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="main">
            <Link to="projectinformation">
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                >
                    Project Information
                </Button>
            </Link>
            <DropdownLanguage />
            <Text />
        </div>
    )
};

export default Home;