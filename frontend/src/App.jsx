import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import TL_Board from "./components/TlBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Home/>
      <Routes>
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/tl-board" element={ <TL_Board/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;