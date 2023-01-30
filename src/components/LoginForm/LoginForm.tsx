import React, { ChangeEvent, useState } from "react"
import { Button, Grid, IconButton, Input, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
    onLogin?: React.MouseEventHandler<HTMLButtonElement>;
};

const LoginForm = ({ onLogin = () => { null } }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const { i18n } = useTranslation();
    function passwordChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

    }

    return (
        <Paper elevation={3}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                margin={2}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {i18n.t("components.login.title") as string}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    {i18n.t("components.login.subtitle") as string}
                </Typography>
                <Stack spacing={2} direction="column">
                    <TextField label={i18n.t("components.login.username") as string} />
                    <TextField
                        label={i18n.t("components.login.password") as string}
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={passwordChangeHandler}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={onLogin}>
                        {i18n.t("components.login.login") as string}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default LoginForm;
