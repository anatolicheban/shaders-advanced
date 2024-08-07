import "./App.scss";
import { Route, Routes } from "react-router";
import { Test } from "./views/Test";
import { BrowserRouter } from "react-router-dom";
import { Particles } from "./views/Particles";
import { Intro } from "./views/Intro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Intro />} />
        <Route path={"test"} element={<Test />} />
        <Route path={"particles"} element={<Particles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
