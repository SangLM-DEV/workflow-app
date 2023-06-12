import React, { useContext } from 'react';
import NavItem from 'components/layout/Navbar/NavItem/NavItem';
import Login from 'dialogs/Login';
import Register from 'dialogs/Register/Register';
import { ModalContext, ModalActionType } from 'context/ModalContext';
import './DefaultNav.scss';

const DefaultNav: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);

  const openLoginModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Login />, title: 'Đăng nhập', size: 's' }
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: 'Đăng ký', size: 's' }
    });
  };

  return (
    <>
      <NavItem label="Login" onClick={openLoginModal} />
      <NavItem label="Register" onClick={openRegisterModal} />
    </>
  );
};

export default DefaultNav;
