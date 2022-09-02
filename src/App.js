import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WorkOrder from "./components/WorkOrder";
import AddWorkOrder from "./components/AddWorkOrder";
import Team from "./components/Team";
import Bts from "./components/Bts";
import UserProfile from "./components/UserProfile";
import Absensi from "./components/Absensi";
import AddAbsensi from "./components/AddAbsensi";
import TerbitkanWO from "./components/TerbitkanWO";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path='/home' element={<><NavBar/><Home/><Footer/></>}></Route>
        <Route exact path='/workorder' element={<><NavBar/><AddWorkOrder/><WorkOrder/><Footer/></>}></Route>
        <Route exact path='/terbitkanwo/:id' element={<><NavBar/><TerbitkanWO/><Footer/></>}></Route>
        <Route exact path='/team' element={<><NavBar/><Team/><Footer/></>}></Route>
        <Route exact path='/bts' element={<><NavBar/><Bts/><Footer/></>}></Route>
        <Route exact path='/profile' element={<><NavBar/><UserProfile/><Footer/></>}></Route>
        <Route exact path='/absensi' element={<><NavBar/><Absensi/><Footer/></>}></Route>
        <Route exact path='/addabsensi' element={<><NavBar/><AddAbsensi/><Footer/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
