import "./App.scss";
import { Route, Routes } from "react-router";
import { Text } from "./views/Text";
import { BrowserRouter } from "react-router-dom";
import { Particles } from "./views/Particles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Text />} />
        <Route path={"particles"} element={<Particles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
