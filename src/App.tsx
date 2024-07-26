import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThrowDices } from "./pages/ThrowDices";
import { Nav } from "./components/Nav";
import { FPSGame } from "./pages/FPSGame";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ThrowDices />} />
        <Route path="/fps" element={<FPSGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
