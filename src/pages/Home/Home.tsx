import { DropdownLanguage, Text, SnackbarTest, Snackbars } from "@components";



export const Home = () => {
    return (
        <div className="main">
            <DropdownLanguage />
            <Text />
            <Snackbars/>
            <SnackbarTest/>
        </div>
    )
};

export default Home;