import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThrowDices } from "./pages/ThrowDices";
import { Nav } from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ThrowDices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
