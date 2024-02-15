import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WorkOrder from "./components/WorkOrder";
import Team from "./components/Team";
import Bts from "./components/Bts";
import MessagePage from "./layouts/MessagePage";
import UserProfile from "./components/UserProfile";
import Absensi from "./components/Absensi";
import AddAbsensi from "./components/AddAbsensi";
import TerbitkanWO from "./components/TerbitkanWO";
import AddWorkOrder from "./layouts/AddWorkOrder";
import RiwayatWorkOrder from "./layouts/RiwayatWorkOrder";
import ModalListFat from "./components/ModalListFat";
import Fat from "./layouts/Fat";
import AddFat from "./layouts/AddFat";
import UpdateFat from "./layouts/UpdateFat";
import Dismantle from "./layouts/Dismantle";
import AddWoDismantle from "./layouts/AddWoDismantle";
import UpdateWoDismantle from "./layouts/UpdateWoDismantle";
import RiwayatDismantle from "./layouts/RiwayatDismantle";
import Maintenance from "./layouts/Maintenance";
import RiwayatMaintenance from "./layouts/RiwayatMaintenance";
import UpdateUserData from "./layouts/UpdateUserData";
import AddWoMaintenance from "./layouts/AddWoMaintenance";
import UpdateWoMaintenance from "./layouts/UpdateWoMaintenance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/home"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/workorder"
          element={
            <>
              <NavBar />
              <WorkOrder />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/addworkorder"
          element={
            <>
              <NavBar />
              <AddWorkOrder />
              <ModalListFat />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/terbitkanwo/:id"
          element={
            <>
              <NavBar />
              <TerbitkanWO />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/riwayatworkorder"
          element={
            <>
              <NavBar />
              <RiwayatWorkOrder />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/dismantle"
          element={
            <>
              <NavBar />
              <Dismantle />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/addwodismantle"
          element={
            <>
              <NavBar />
              <AddWoDismantle />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/updatewodismantle/:id"
          element={
            <>
              <NavBar />
              <UpdateWoDismantle />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/riwayatdismantle"
          element={
            <>
              <NavBar />
              <RiwayatDismantle />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/maintenance"
          element={
            <>
              <NavBar />
              <Maintenance />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/updatewomaintenance/:id"
          element={
            <>
              <NavBar />
              <UpdateWoMaintenance />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/riwayatmaintenance"
          element={
            <>
              <NavBar />
              <RiwayatMaintenance />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/addwomaintenance"
          element={
            <>
              <NavBar />
              <AddWoMaintenance />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/team"
          element={
            <>
              <NavBar />
              <Team />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/updateuserdata/:id"
          element={
            <>
              <NavBar />
              <UpdateUserData />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/fat"
          element={
            <>
              <NavBar />
              <Fat />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/bts"
          element={
            <>
              <NavBar />
              <Bts />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/messagepage"
          element={
            <>
              <NavBar />
              <MessagePage />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            <>
              <NavBar />
              <UserProfile />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/absensi"
          element={
            <>
              <NavBar />
              <Absensi />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/addabsensi"
          element={
            <>
              <NavBar />
              <AddAbsensi />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/addfat"
          element={
            <>
              <NavBar />
              <AddFat />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exact
          path="/updatefat/:id"
          element={
            <>
              <NavBar />
              <UpdateFat />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
