import { Breadcrumbs, Divider, Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system"

import { Outlet, useLocation } from "react-router-dom";
import MenuBar from "src/components/MenuBar/MenuBar";

const MainFrame = () => {
    return (
        <Stack>
            <MenuBar />
            {BreadcrumbsContainer()}
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={2} sx={{ borderRight: '2px solid grey' }}>
                    {LocalNav()}
                </Grid>
                <Grid item xs={8}>
                    <Container>
                        <Outlet />
                    </Container>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h4">Gamification</Typography>
                </Grid>

            </Grid>
            <Divider />
            {Footer()}
        </Stack >
    )

};

const Footer = () => {
    return <Typography variant="h1">Footer</Typography>;
}
export default MainFrame;


const BreadcrumbsContainer = () => {
    const location = useLocation();
    return <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">{location.pathname}</Typography>
    </Breadcrumbs>;
}

const LocalNav = () => {
    return <>
        <Typography variant="h5">Banner</Typography>
        <Divider />
        <Typography variant="h5">Banner</Typography>
        <Divider />

        <Typography variant="h5">Banner</Typography>
        <Divider />

        <Typography variant="h5">Banner</Typography>
    </>;
}