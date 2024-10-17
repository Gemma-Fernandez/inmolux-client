import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Vivienda from "./Pages/Vivienda";
import NotFound from "./Pages/NotFound";
import AdminProfile from "./Pages/AdminProfile";
import ViviendasDetails from "./Pages/ViviendasDetails";
import ErrorPage from"./Pages/ErrorPage"
import UserProfile from "./Pages/UserProfile";
import { DataWrapper } from "./context/Data.context.jsx";
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="container-app">
      <DataWrapper>
        <NavBar/>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/vivienda"} element={<Vivienda />} />
          <Route path={"/user/:userId"} element={<UserProfile />} />
          <Route path={"/vivienda/:viviendasId"} element={<ViviendasDetails />}/>
          <Route path={"/admin/:adminId"} element={<AdminProfile />} />
          <Route path={"*"} element={<NotFound />} />
          <Route path={"/500"} element={<ErrorPage/>} />
        </Routes>
      </DataWrapper>
    </div>
  );
}

export default App;
