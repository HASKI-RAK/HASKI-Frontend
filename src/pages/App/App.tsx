import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@common/theme'
import { PrivacyModal } from '@components'
import {
  MainFrame,
  Home,
  ThemePresentation,
  Login,
  PrivacyPolicy,
  Contact,
  ProjectDescription,
  ProjectInformation,
  Imprint,
  Topic,
  Course,
  PageNotFound
} from '@pages'
import { AuthProvider, SnackbarProvider } from '@services'
import { HaskiTheme } from '@utils'

/**
 * # App
 * Entry point of the application.
 * @remarks
 * This is the main component of the application and the entry point after the index.tsx.
 * It contains the {@link MainFrame} and the routes to the other pages.
 * The {@link HaskiTheme} is injected here. Additionally, the {@link AuthProvider} is used to provide the authentication context.
 * The {@link SnackbarProvider} is used to provide the snackbars to all pages.
 *
 * @category Pages
 */
export const App = () => (
  <ThemeProvider theme={HaskiTheme}>
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <PrivacyModal />
          <Routes>
            <Route element={<MainFrame />}>
              <Route index element={<Home />} />
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/course/:courseId/topic/:topicId" element={<Topic />} />
              <Route path="/theme" element={<ThemePresentation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/projectinformation" element={<ProjectInformation />} />
              <Route path="/projectinformation/projectdescription" element={<ProjectDescription />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/🥚" element={<div>Ei</div>} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
)
export default App
