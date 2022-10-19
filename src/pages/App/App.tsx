import { ThemeProvider } from "@mui/material";
import { ThemePresentation } from "@pages";
import { Theme } from "@utils";
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dashboard } from "src/components/Dashboard/Dashboard";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/theme" element={<ThemePresentation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
