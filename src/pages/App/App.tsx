import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserInteractionTracker, XAPIProvider } from 'react-xapi-wrapper'
import { ReactFlowProvider } from 'reactflow'
import {
  AboutUs,
  Contact,
  Course,
  Glossary,
  Home,
  Imprint,
  LearnerCharacteristics,
  Login,
  MainFrame,
  PageNotFound,
  PrivacyPolicy,
  ProjectDescription,
  Rating,
  Topic
} from '@pages'
import { AuthProvider, ILSProvider, RoleProvider, SnackbarProvider, ThemeProvider } from '@services'
import { useApp } from './App.hooks'

/**
 * # App
 * Entry point of the application.
 * @remarks
 * This is the main component of the application and the entry point after the index.tsx.
 * It contains the {@link MainFrame} and the routes to the other pages.
 * The {@link ThemeProvider} provides the custom theme context.
 * The {@link AuthProvider} is used to provide the authentication context.
 * The {@link SnackbarProvider} is used to provide the snackbars to all pages.
 *
 * @category Pages
 */
export const App = () => {
  const { xAPI } = useApp()

  return (
    <ThemeProvider>
      <ReactFlowProvider>
        <SnackbarProvider>
          <Router>
            <AuthProvider>
              <RoleProvider>
                <ILSProvider>
                <XAPIProvider value={xAPI}>
                    <UserInteractionTracker
                      componentFilePath={new URL(import.meta.url).pathname}
                      componentType="UserInteractionTracker"
                      pageName="App"
                    />
                    <Routes>
                      <Route element={<MainFrame />}>
                        <Route index element={<Home />} />
                        <Route path="/course/:courseId" element={<Course />} />
                        <Route path="/course/:courseId/topic/:topicId" element={<Topic />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                        <Route path="/projectdescription" element={<ProjectDescription />} />
                        <Route path="/glossary" element={<Glossary />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/imprint" element={<Imprint />} />
                        <Route path="/learnercharacteristics" element={<LearnerCharacteristics />} />
                        <Route path="/rating" element={<Rating />} />
                        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                        <Route path="/🥚" element={<div>Ei</div>} />
                        <Route path="*" element={<PageNotFound />} />
                      </Route>
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </XAPIProvider>
                </ILSProvider>
              </RoleProvider>
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

export default App
