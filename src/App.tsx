import { HashRouter as Router } from "react-router-dom";
import Home from "./components/molecules/Home/Home";

const App = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
