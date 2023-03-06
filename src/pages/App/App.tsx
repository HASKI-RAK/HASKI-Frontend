import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "@services";
import { Home, ThemePresentation, Login, Dashboard, ProjectInformation, Glossary } from "@pages";
import { Theme } from "@utils";
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () =>
  <ThemeProvider theme={Theme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theme" element={<ThemePresentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectinformation" element={<ProjectInformation />} />
          <Route path="/projectinformation/glossary" element={<Glossary />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>;
export default App;