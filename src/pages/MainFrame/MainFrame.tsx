import { Breadcrumbs, Divider, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system"

import { Outlet, useLocation } from "react-router-dom";
import MenuBar from "src/components/MenuBar/MenuBar";

const MainFrame = () => {
    return (
        <Stack direction="column"
            sx={{ minHeight: 'inherit' }}>
            <MenuBar />
            <BreadcrumbsContainer />
            <Grid flex={1} container sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <Grid
                    container
                    item
                    flexGrow={1}
                    sx={{ alignItems: 'stretch' }}
                >
                    <Grid item xs={2} >
                        <Box>
                            <Typography variant="h5">Banner</Typography>
                            <Divider />
                            <Typography variant="h5">Banner</Typography>
                            <Divider />

                            <Typography variant="h5">Banner</Typography>
                            <Divider />

                            <Typography variant="h5">Banner</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
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
                <Divider flexItem />
                <Footer />
            </Grid>
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

// const LocalNav = () => {
//     return (
// }