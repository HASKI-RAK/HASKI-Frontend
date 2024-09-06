import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import {ThemeContextProvider} from '@services'
import {
  AboutUs,
  Contact,
  Course,
  Glossary,
  Home,
  Imprint,
  Login,
  MainFrame,
  PageNotFound,
  PrivacyPolicy,
  ProjectDescription,
  ThemePresentation,
  Topic
} from '@pages'
import { AuthProvider, SnackbarProvider } from '@services'
import { getConfig } from '@shared'
import { usePersistedStore } from '@store'

/**
 * # App
 * Entry point of the application.
 * @remarks
 * This is the main component of the application and the entry point after the index.tsx.
 * It contains the {@link MainFrame} and the routes to the other pages.
 * The {@link ThemeContextProvider} provides the theme context.
 * The {@link AuthProvider} is used to provide the authentication context.
 * The {@link SnackbarProvider} is used to provide the snackbars to all pages.
 *
 * @category Pages
 */
export const App = () => {
  const setXAPI = usePersistedStore().setXAPI
  const getXAPI = usePersistedStore().getXAPI
  useEffect(() => {
    setXAPI(getConfig().LRS ?? '', getConfig().LRS_AUTH_USERNAME ?? '', getConfig().LRS_AUTH_PASSWORD ?? '')
  }, [])

  return (
    <>
      {getXAPI() && (
        <ThemeContextProvider>
          <ReactFlowProvider>
            <SnackbarProvider>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route element={<MainFrame />}>
                      <Route index element={<Home />} />
                      <Route path="/course/:courseId" element={<Course />} />
                      <Route path="/course/:courseId/topic/:topicId" element={<Topic />} />
                      <Route path="/theme" element={<ThemePresentation />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                      <Route path="/projectdescription" element={<ProjectDescription />} />
                      <Route path="/glossary" element={<Glossary />} />
                      <Route path="/aboutus" element={<AboutUs />} />
                      <Route path="/imprint" element={<Imprint />} />
                      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                      <Route path="/🥚" element={<div>Ei</div>} />
                      <Route path="*" element={<PageNotFound />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </AuthProvider>
              </Router>
            </SnackbarProvider>
          </ReactFlowProvider>
        </ThemeContextProvider>
      )}
    </>
  )
}
export default App
