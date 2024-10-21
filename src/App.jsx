import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Vivienda from "./Pages/Vivienda";
import NotFound from "./Pages/NotFound";
import AdminProfile from "./Pages/AdminProfile";
import ViviendasDetails from "./Pages/ViviendasDetails";
import ErrorPage from "./Pages/ErrorPage"
import UserProfile from "./Pages/UserProfile";
import NavBar from "./components/NavBar"
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute"
import EditForm from "./components/formulariosVivienda/EditForm"
import ShowWishlist from "./Pages/ShowWishlist";
import AddViviendaForm from "./components/formulariosVivienda/AddViviendaForm"
import Search from "./Pages/Search";

function App() {
  return (
    <div className="container-app">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/vivienda"} element={<Vivienda />} />
        <Route path={"/user/:profile"} element={<PrivateRoute> <UserProfile /></PrivateRoute>} />
        <Route path={"/user/wishlist"} element={<PrivateRoute><ShowWishlist /></PrivateRoute>} />
        <Route path={"/vivienda/:viviendasId"} element={<PrivateRoute> <ViviendasDetails /> </PrivateRoute>} />
        <Route path={"vivienda/:viviendasId/edit"} element={<PrivateRoute> <EditForm /> </PrivateRoute>} />
        <Route path={"/vivienda/search"} element={<Search />} />
        <Route path={"/vivienda/addVivienda"} element={<PrivateRoute><AddViviendaForm /></PrivateRoute>} />
        <Route path={"/admin/profile"} element={<AdminProfile />} /> 
        <Route path={"*"} element={<NotFound />} />
        <Route path={"/500"} element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
