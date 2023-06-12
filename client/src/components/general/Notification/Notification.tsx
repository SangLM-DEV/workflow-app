import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Notification.scss';
import './Notification-dark.scss';
import { useHistory } from 'react-router-dom';
import { NotificationProps } from './';

//Hàm thông báo
const Notification: React.FC<NotificationProps> = ({
  boardTitle,
  message,
  url,
  removeNotification
}) => {
  const history = useHistory();

  //thông báo khi click link
  const clickNotificationLink = () => {
    removeNotification();
    if (!!url) history.push(url);
  };

  return (
    <div className="notification">
      <div onClick={clickNotificationLink} className="notification__content">
        <h2 className="notification__content__title">{boardTitle}</h2>
        <p className="notification__content__message">{message}</p>
      </div>
      <FaTimes className="notification__close-icon" onClick={removeNotification} />
    </div>
  );
};

export default Notification;
