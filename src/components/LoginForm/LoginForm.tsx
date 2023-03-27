import { ChangeEvent, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import {
  useLoginForm as _useLoginForm,
  useLoginFormHookParams as LoginFormHookParams,
  LoginFormHookReturn,
} from "./LoginForm.hooks";

/**
 * @typedef {Object} LoginFormProps
 * @param {function} onSubmit - The function to be called when the form is submitted.
 * @param {function} onValidate - The function to be called when the form is validated.
 * @param {string} usernameDefaultValue - The default value for the username field.
 * @param {boolean} isLoading - Whether the form is loading or not.
 * @param useLoginForm - The hook to be used for the form logic.
 */
export type LoginFormProps = {
  onSubmit?: (username: string, password: string) => void;
  onValidate?: (
    username: string,
    password: string
  ) => readonly [boolean, boolean];
  usernameDefaultValue?: string;
  isLoading?: boolean;
  useLoginForm?: (params?: LoginFormHookParams) => LoginFormHookReturn;
};
/**
 * LoginForm presents a form for the user to login.
 * It can be used as a standalone component on a page. The functionality
 * comes by default, but it can be overriden by custom functions passed as described
 * in {@link LoginFormProps.useLoginForm} or {@link LoginFormProps.onSubmit} and {@link LoginFormProps.onValidate}.
 * @param props - Props containing the form logic and the form state.
 * @returns {JSX.Element} - The Form component.
 * @category Components
 */
export const LoginForm = ({
  useLoginForm = _useLoginForm,
  ...props
}: LoginFormProps) => {
  // UX State
  const [usernameHasError, setUsernameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Application logic hooks
  const { username, password, setUsername, setPassword, submit, validate } =
    useLoginForm();

  // Props destructuring
  const {
    onSubmit = submit,
    onValidate = validate,
    usernameDefaultValue: usernameDefault = "",
    isLoading = false,
  } = props;

  // Event Handlers
  const handleSubmit = () => {
    const [usernameIsValid, passwordIsValid] = onValidate(username, password);
    setUsernameHasError(!usernameIsValid);
    setPasswordHasError(!passwordIsValid);
    if (usernameIsValid && passwordIsValid) onSubmit(username, password);
  };
  const usernameChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPassword(event.target.value);
  };

  // Translation
  const { t } = useTranslation();

  return (
    <Paper elevation={3}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        margin={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("components.login.title")}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {t("components.login.subtitle")}
        </Typography>
        <Stack spacing={2} direction="column">
          <TextField
            required
            error={usernameHasError}
            helperText={
              usernameHasError ? t("components.login.usernameError") : ""
            }
            label={t("components.login.username")}
            defaultValue={usernameDefault}
            onChange={usernameChangeHandler}
            name="username"
          />
          <TextField
            required
            error={passwordHasError}
            helperText={
              passwordHasError ? t("components.login.passwordError") : ""
            }
            label={t("components.login.password")}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={passwordChangeHandler}
            name="password"
            id="password"
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
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t("components.login.login")}
          </Button>
        </Stack>
      </Stack>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default LoginForm;
