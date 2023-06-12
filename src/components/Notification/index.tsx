import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import clsx from 'clsx';

export const showSuccessNotify = (message: string) => {
  toast.success(
    <div className={clsx(styles['notification__content'], styles['notification__content__success'])}>
      <img src="/images/icon_success.png" />
      <p>{message}</p>
    </div>,
    {
      position: toast.POSITION.TOP_RIGHT,
      closeButton: false,
      icon: false,
      autoClose: 5000,
      hideProgressBar: true,
      draggable: false,
      className: clsx(
        styles["notification__container"],
        styles["notification__success"]
      ),
    }
  );
};

export const showErrorNotify = (message: string) => {
  toast.error(
    <div
      className={clsx(
        styles["notification__content"],
        styles["notification__content__error"]
      )}
    >
      <img src="/images/icon_error.png" />
      <p>{message}</p>
    </div>,
    {
      position: toast.POSITION.TOP_RIGHT,
      closeButton: false,
      icon: false,
      autoClose: 5000,
      hideProgressBar: true,
      draggable: false,
      className: clsx(
        styles["notification__container"],
        styles["notification__error"]
      ),
    }
  );
};