import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./AdminPages/components/Narbar/Narbar";
import Menu from "./AdminPages/components/Menu/Menu";
import { routes, userPages } from "./router";
import { useDispatch, useSelector } from "react-redux";
import OrderDetal from "./AdminPages/components/OrderDetal/OrderDetal";
import Heading from "./UserPages/components/Heading/Heading";
import Narbar from "./AdminPages/components/Narbar/Narbar";
import NarbarUser from "./UserPages/components/Narbar/Narbar";
import Login from "./UserPages/popup/Login/Login";
import FilterPopup from "./UserPages/popup/FilterPopup/FilterPopup";
import DeletePopup from "./UserPages/popup/DeletePopup/DeletePopup";
import { setWWidthScreen } from "./redux/sliders/stateSlider";
import ConfirmDeleteProduct from "./AdminPages/popup/ConfirmDeleteProduct";
import ConfirmDeleteUser from "./AdminPages/popup/ConfirmDeleteUser";
import ConfirmDeleteOrder from "./AdminPages/popup/ConfirmDeleteOrder";
import AccountPopup from "./UserPages/popup/AccountPopup/AccountPopup";
import AvatarPopup from "./UserPages/popup/AvatarPopup/AvatarPopup";
import AdminLogin from "./AdminPages/components/AdminLogin/AdminLogin";
const App = () => {
  const dispatch = useDispatch();
  const deleteProduct = useSelector((state) => state.stateAdmin.deleteProduct);
  const deleteUser = useSelector((state) => state.stateAdmin.deleteUser);
  const deleteOrder = useSelector((state) => state.stateAdmin.deleteOrder);
  const editOrder = useSelector((state) => state.stateAdmin.editOrder);
  const loginPopup = useSelector((state) => state.state.loginPopup);
  const filterPopup = useSelector((state) => state.state.filterPopup);
  const deletePopup = useSelector((state) => state.state.deletePopup);
  const avatarPopup = useSelector((state) => state.state.avatarPopup);
  const [activeMenu, setActiveMenu] = useState(true);
  const widthScreen = useSelector((state) => state.state.widthScreen);
  const accountPopup = useSelector((state) => state.state.AccountPopup);
  useEffect(() => {
    const handleSetWidth = (e) => {
      dispatch(setWWidthScreen(e.target.innerWidth));
    };

    window.addEventListener("resize", handleSetWidth);
    return () => {
      window.removeEventListener("resize", handleSetWidth);
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/*  admin dashboard */}
        {routes.map((route, index) => {
          const Pages = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {!route.login && <Navbar />}
                  {!route.login && <Menu />}
                  {!route.login && (
                    <div className="page text-white">
                      <Pages />
                    </div>
                  )}
                  {route.login && <AdminLogin />}

                  {deleteProduct?.state && (
                    <div className="confirmDeleteProduct">
                      <ConfirmDeleteProduct />
                    </div>
                  )}

                  {deleteUser?.state && (
                    <div className="confirmDeleteProduct">
                      <ConfirmDeleteUser />
                    </div>
                  )}

                  {deleteOrder?.state && (
                    <div className="confirmDeleteProduct">
                      <ConfirmDeleteOrder />
                    </div>
                  )}

                  {editOrder?.state && (
                    <div className="EditOrder">
                      <OrderDetal />
                    </div>
                  )}
                </>
              }
            />
          );
        })}

        {/* user pages */}

        {userPages.map((item, index) => {
          const Pages = item.component;
          return (
            <Route
              key={index}
              path={item.path}
              element={
                <div className="w-full h-max bg-[#f5f5fa] overflow-x-hidden">
                  {widthScreen > 950 ? <Heading /> : null}
                  {widthScreen > 950 ? <NarbarUser /> : null}
                  <div className="pages w-full h-max pb-16 overflow-x-hidden">
                    <Pages />
                  </div>
                  {loginPopup && (
                    <div
                      className="w-[100vw] h-[100vh] fixed top-0 left-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <Login />
                    </div>
                  )}

                  {filterPopup && (
                    <div
                      className="w-[100vw] h-[100vh] fixed top-0 left-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <FilterPopup />
                    </div>
                  )}

                  {accountPopup && (
                    <div className="fixed top-14 right-12">
                      <AccountPopup />
                    </div>
                  )}
                  {deletePopup.state && (
                    <div
                      className="w-[100vw] h-[100vh] fixed top-0 left-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <DeletePopup />
                    </div>
                  )}

                  {avatarPopup && (
                    <div
                      className="w-[100vw] h-[100vh] fixed top-0 left-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <AvatarPopup />
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
