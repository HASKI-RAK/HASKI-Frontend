import React, { ChangeEvent, useState } from "react"
import { Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
    usernameDefault?: string;
    onLogin?: React.MouseEventHandler<HTMLButtonElement>;
    usernameError?: boolean;
    passwordError?: boolean;
    onUsernameChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPasswordChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const LoginForm = ({ usernameDefault, onLogin, usernameError, passwordError, onUsernameChange: usernameChangeHandler, onPasswordChange: passwordChangeHandler }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const { i18n } = useTranslation();

    return (
        <Paper elevation={3}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                margin={2}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {i18n.t("components.login.title")}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    {i18n.t("components.login.subtitle")}
                </Typography>
                <Stack spacing={2} direction="column">
                    <TextField
                        required
                        error={usernameError}
                        helperText={usernameError ? i18n.t("components.login.usernameError") : ""}
                        label={i18n.t("components.login.username")}
                        defaultValue={usernameDefault}
                        onChange={usernameChangeHandler}
                    />
                    <TextField
                        required
                        error={passwordError}
                        helperText={passwordError ? i18n.t("components.login.passwordError") : ""}
                        label={i18n.t("components.login.password")}
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        onChange={passwordChangeHandler}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={onLogin}>
                        {i18n.t("components.login.login")}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default LoginForm;
