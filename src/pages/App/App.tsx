import { ThemePresentation } from "@pages";
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dashboard } from "src/components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/theme" element={<ThemePresentation />} />
      </Routes>
    </Router>
  );
}
export default App;
