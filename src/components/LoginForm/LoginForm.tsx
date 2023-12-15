import { ChangeEvent, useState } from 'react'
import { Backdrop, Button, CircularProgress, Paper, Grid, Typography, Stack, ImageWrapper } from '@common/components'
import {
  useLoginForm as _useLoginForm,
  useLoginFormHookParams as LoginFormHookParams,
  LoginFormHookReturn
} from './LoginForm.hooks'
import { useTranslation } from 'react-i18next'

/**
 * LoginFormProps is the type of the props object that must be passed to
 * @prop onSubmit - The function to be called when the form is submitted.
 * @prop onValidate - The function to be called when the form is validated.
 * @prop usernameDefaultValue - The default value for the username field.
 * @prop isLoading - Whether the form is loading or not.
 * @prop moodleLogin - Whether the form displays a moodle login button or not.
 * @prop onMoodleLogin - The function to be called when the moodle login button is clicked.
 * @prop useLoginForm - The hook to be used for the form logic.
 */
export type LoginFormProps = {
  onSubmit?: (username: string, password: string) => void
  onValidate?: (username: string, password: string) => readonly [boolean, boolean]
  onMoodleLogin?: () => void
  usernameDefaultValue?: string
  isLoading?: boolean
  moodleLogin?: boolean
  useLoginForm?: (params?: LoginFormHookParams) => LoginFormHookReturn
}
/**
 *
 * LoginForm presents a form for the user to login.
 * It can be used as a standalone component on a page. The functionality
 * comes by default, but it can be overriden by custom functions passed as described
 * in {@link LoginFormProps.useLoginForm} or {@link LoginFormProps.onSubmit} and {@link LoginFormProps.onValidate}.
 * @param props - {@link LoginFormProps} Props containing the form logic and the form state.
 * @returns The Form component.
 * @category Components
 */
const LoginForm = ({ useLoginForm = _useLoginForm, ...props }: LoginFormProps) => {
  // UX State
  const [usernameHasError, setUsernameHasError] = useState(false)
  const [passwordHasError, setPasswordHasError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  // Application logic hooks
  const { username, password, setUsername, setPassword, submit, validate, loginMoodle } = useLoginForm()

  // Props destructuring
  const {
    onSubmit = submit,
    onValidate = validate,
    onMoodleLogin = loginMoodle,
    usernameDefaultValue: usernameDefault = '',
    isLoading = false,
    moodleLogin = false
  } = props

  // Event Handlers
  const handleSubmit = () => {
    const [usernameIsValid, passwordIsValid] = onValidate(username, password)
    setUsernameHasError(!usernameIsValid)
    setPasswordHasError(!passwordIsValid)
    if (usernameIsValid && passwordIsValid) onSubmit(username, password)
  }

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setUsername(event.target.value)
  }

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPassword(event.target.value)
  }

  // Translation
  const { t } = useTranslation()

  return (
    <Stack justifyContent="center" alignItems="center">
      <Paper elevation={3}>
        <Stack direction="column" justifyContent="center" alignItems="center" margin={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('components.LoginForm.title')}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {t('components.LoginForm.subtitle')}
          </Typography>
          {/**
          <Stack spacing={2} direction="column">
            <TextField
              id="login-form-username-textfield"
              required
              error={usernameHasError}
              helperText={usernameHasError ? t('components.LoginForm.usernameError') : ''}
              label={t('components.LoginForm.username')}
              defaultValue={usernameDefault}
              onChange={usernameChangeHandler}
              name="username"
            />
            <TextField
              id="login-form-password-textfield"
              required
              error={passwordHasError}
              helperText={passwordHasError ? t('components.LoginForm.passwordError') : ''}
              label={t('components.LoginForm.password')}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              onChange={passwordChangeHandler}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {t('components.LoginForm.login')}
            </Button>
          */}
          <Stack spacing={2} direction="column">
            {moodleLogin && (
              <Grid container sx={{ justifyContent: 'center' }} direction="column" rowSpacing={5}>
                <Grid item display="flex" justifyContent="center" md={6}>
                  <Button onClick={onMoodleLogin} data-testid="moodle-login-button" variant="text">
                    <img src="/LogoPng.png" alt="Haski" style={{ width: '50px' }} />
                    {
                      <Typography variant="h6" component="h2">
                        {'Login HASKI'}
                      </Typography>
                    }
                  </Button>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Stack>
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Stack>
  )
}

export default LoginForm
