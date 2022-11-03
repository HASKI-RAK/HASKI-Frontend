import { ThemeProvider } from "@mui/material";
import { Home, ThemePresentation } from "@pages";
import { Theme } from "@utils";
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theme" element={<ThemePresentation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
