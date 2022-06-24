import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Team from "./components/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path='/home' element={<><NavBar/><Home/><Footer/></>}></Route>
        <Route exact path='/team' element={<><NavBar/><Team/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
