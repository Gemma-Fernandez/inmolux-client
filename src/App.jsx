import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Vivienda from "./Pages/Vivienda";
import NotFound from "./Pages/NotFound";
import AdminProfile from "./Pages/AdminProfile";
import ViviendasDetails from "./Pages/ViviendasDetails";
import UserProfile from "./Pages/UserProfile";
import { DataWrapper } from "./context/Data.context.jsx";

function App() {
  return (
    <div className="container-app">
      <DataWrapper>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/vivienda"} element={<Vivienda />} />
          <Route path={"/user/:userId"} element={<UserProfile />} />
          <Route path={"/vivienda/:viviendasId"} element={<ViviendasDetails />}/>
          <Route path={"/admin/:adminId"} element={<AdminProfile />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </DataWrapper>
    </div>
  );
}

export default App;
