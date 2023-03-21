import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "@services";
import { Home, ThemePresentation, Login, Dashboard } from "@pages";
import { Theme } from "@utils";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainFrame from "../MainFrame/MainFrame";
import { logBuffer } from "@shared";

logBuffer();

const App = () =>
  // <ThemeProvider theme={Theme}>
  <AuthProvider>
    <Router>
      <Routes>
        <Route element={<MainFrame />}>
          <Route index element={<Home />} />
          <Route path="/theme" element={<ThemePresentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
// </ThemeProvider >;
export default App;
