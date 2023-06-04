import React, { useContext } from "react";
import NavItem from "components/layout/Navbar/NavItem/NavItem";
import Login from "dialogs/Login";
import Register from "dialogs/Register/Register";
import { ModalContext, ModalActionType } from "context/ModalContext";
import "./DefaultNav.scss";

const DefaultNav: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);

  const openLoginModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Login />, title: "Đăng Nhập", size: "s" },
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: "Đăng Ký", size: "s" },
    });
  };

  return (
    <>
      <NavItem label="Đăng Nhập" onClick={openLoginModal} />
      <NavItem label="Đăng Ký" onClick={openRegisterModal} />
    </>
  );
};

export default DefaultNav;
