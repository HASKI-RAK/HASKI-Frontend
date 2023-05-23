import { ChangeEvent, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material/'
import {
  DefaultBackdrop as Backdrop,
  DefaultButton as Button,
  DefaultCircularProgress as CircularProgress,
  DefaultIconButton as IconButton,
  DefaultInputAdornment as InputAdornment,
  DefaultPaper as Paper,
  DefaultTextField as TextField,
  DefaultGrid as Grid,
  DefaultTypography as Typography,
  DefaultDivider as Divider,
  DefaultStack as Stack
} from '@common/components'
import {
  useLoginForm as _useLoginForm,
  useLoginFormHookParams as LoginFormHookParams,
  LoginFormHookReturn
} from './LoginForm.hooks'
import { useTranslation } from 'react-i18next'

/**
 * @typedef {Object} LoginFormProps
 * @property {function} onSubmit - The function to be called when the form is submitted.
 * @property {function} onValidate - The function to be called when the form is validated.
 * @property {string} usernameDefaultValue - The default value for the username field.
 * @property {boolean} isLoading - Whether the form is loading or not.
 * @property {boolean} moodleLogin - Whether the form displays a moodle login button or not.
 * @property {function} onMoodleLogin - The function to be called when the moodle login button is clicked.
 * @property {function} useLoginForm - The hook to be used for the form logic.
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
 * LoginForm presents a form for the user to login.
 * It can be used as a standalone component on a page. The functionality
 * comes by default, but it can be overriden by custom functions passed as described
 * in {@link LoginFormProps.useLoginForm} or {@link LoginFormProps.onSubmit} and {@link LoginFormProps.onValidate}.
 * @param props - Props containing the form logic and the form state.
 * @returns {JSX.Element} - The Form component.
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
    <Paper elevation={3}>
      <Stack direction="column" justifyContent="center" alignItems="center" margin={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('components.Login.title')}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {t('components.Login.subtitle')}
        </Typography>
        <Stack spacing={2} direction="column">
          <TextField
            required
            error={usernameHasError}
            helperText={usernameHasError ? t('components.Login.usernameError') : ''}
            label={t('components.Login.username')}
            defaultValue={usernameDefault}
            onChange={usernameChangeHandler}
            name="username"
          />
          <TextField
            required
            error={passwordHasError}
            helperText={passwordHasError ? t('components.Login.passwordError') : ''}
            label={t('components.Login.password')}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            onChange={passwordChangeHandler}
            name="password"
            id="password"
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
            {t('components.Login.login')}
          </Button>
          {moodleLogin && (
            <Grid container sx={{ justifyContent: 'center' }} direction="column" rowSpacing={2}>
              <Grid item sm={0} md={6}>
                <Divider flexItem>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: (theme) => theme.palette.secondary.dark
                    }}>
                    {t('components.Login.orLoginWithMoodle')}
                  </Typography>
                </Divider>
              </Grid>
              <Grid item display="flex" justifyContent="center" md={6}>
                <Button onClick={onMoodleLogin} data-testid="moodle-login-button">
                  <img src="/LogoMoodle.png" alt="Moodle" style={{ width: '100px' }} />
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
  )
}

export default LoginForm
