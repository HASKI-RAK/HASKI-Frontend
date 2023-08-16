import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@common/components'
import {
  MainFrame,
  Home,
  ThemePresentation,
  Login,
  Dashboard,
  Contact,
  ProjectDescription,
  ProjectInformation,
  Imprint,
  Glossary
} from '@pages'
import { AuthProvider, SnackbarProvider } from '@services'
import { logBuffer } from '@shared'
import { HaskiTheme } from '@utils'

logBuffer()

/**
 * App component.
 *
 * @remarks
 * This is the main component of the application and the entry point after the index.tsx.
 * It contains the main frame and the routes to the other pages.
 * The Theme is injected here. Additionally, the AuthProvider is used to provide the authentication context.
 *
 * @category Pages
 */
const App = () => (
  <ThemeProvider theme={HaskiTheme}>
    <AuthProvider>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route element={<MainFrame />}>
              <Route index element={<Home />} />
              <Route path="/theme" element={<ThemePresentation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projectinformation" element={<ProjectInformation />} />
              <Route path="/projectinformation/projectdescription" element={<ProjectDescription />} />
              <Route path="/projectinformation/glossary" element={<Glossary />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/🥚" element={<div>Ei</div>} />
              <Route path="*" element={<div>404</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  </ThemeProvider>
)
export default App
