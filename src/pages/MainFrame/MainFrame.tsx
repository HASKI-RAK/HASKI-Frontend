import { Divider, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Outlet } from "react-router-dom";
import { MenuBar } from "@components";
import { Footer } from "@components";
import { BreadcrumbsContainer } from "@components";
import { LocalNav } from "@components";

/**
 * Main frame component.
 * 
 * @remarks
 * It contains the main frame of the application and is used in the App.tsx.
 * It contains the menu bar, the breadcrumbs, the local navigation and the outlet for the other pages.
 * The footer is also included.
 * It holds a layout for all pages.
 * Help, Global settings and User settings are also included in the menu bar. 
 * 
 * @category Pages
 */
const MainFrame = () =>
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
                <Grid item xs={2}>
                    <Box height={'100%'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
                        <LocalNav />
                        <Divider flexItem orientation="vertical" />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    {/**💉 Pages get injected here through App routing */}
                    <Container>
                        <Outlet />
                    </Container>
                </Grid>
                <Grid item xs={2}>
                    {/** TODO 📑 add real gameification */}
                    <Typography variant="h4">Gamification</Typography>
                </Grid>

            </Grid>
            <Divider flexItem />
            <Footer />
        </Grid>
    </Stack >


export default MainFrame;

