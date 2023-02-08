import React, { ChangeEvent, useState } from "react"
import { Backdrop, Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useLoginForm as _useLoginForm, useLoginFormParams, useLoginFormReturn } from "./LoginForm.hooks";
import { Type } from "typescript";

type LoginFormProps = {
    onSubmit?: (username: string, password: string) => void;
    onValidate?: (username: string, password: string) => [boolean, boolean];
    usernameDefaultValue?: string;
    isLoading?: boolean;
    useLoginForm?: (params?: useLoginFormParams) => useLoginFormReturn;
};

const LoginForm = ({ useLoginForm = _useLoginForm, ...props }: LoginFormProps) => {

    // Custom state hook
    const { username, password, usernameHasError, passwordHasError, setUsername, setPassword, setUsernameHasError, setPasswordHasError }
        = useLoginForm();

    // Props destructuring
    const {
        onSubmit = () => { }, onValidate = () => [username.length !== 0, password.length !== 0],
        usernameDefaultValue: usernameDefault = "", isLoading = false
    } = props;

    // UX State
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    // Event Handlers
    const handleSubmit = () => {
        const [usernameIsValid, passwordIsValid] = onValidate(username, password);
        setUsernameHasError(!usernameIsValid);
        setPasswordHasError(!passwordIsValid);
        if (usernameIsValid && passwordIsValid)
            onSubmit(username, password);
    }
    const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUsername(event.target.value);
    }

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
    }

    // Translation
    const { i18n } = useTranslation();

    return (
        <Paper elevation={3} >
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
                        error={usernameHasError}
                        helperText={usernameHasError ? i18n.t("components.login.usernameError") : ""}
                        label={i18n.t("components.login.username")}
                        defaultValue={usernameDefault}
                        onChange={usernameChangeHandler}
                    />
                    <TextField
                        required
                        error={passwordHasError}
                        helperText={passwordHasError ? i18n.t("components.login.passwordError") : ""}
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
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {i18n.t("components.login.login")}
                    </Button>
                </Stack>
            </Stack>
            <Backdrop
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Paper >
    )
}

export default LoginForm;
