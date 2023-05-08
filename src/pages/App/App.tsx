import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultThemeProvider as ThemeProvider } from "@common/components";
import { MainFrame, Home, ThemePresentation, Login, Dashboard, Contact } from "@pages";
import { AuthProvider } from "@services";
import { logBuffer } from "@shared";
import { HaskiTheme} from "@utils";

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
      <Router>
        <Routes>
          <Route element={<MainFrame />}>
            <Route index element={<Home />} />
            <Route path="/theme" element={<ThemePresentation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="*" element={<div>404</div>} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
)
export default App
