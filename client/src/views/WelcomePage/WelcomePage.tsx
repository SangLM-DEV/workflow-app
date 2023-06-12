import React, { useContext } from 'react';
import './WelcomePage.scss';
import Button from 'components/general/Button';
import { ModalContext, ModalActionType } from 'context/ModalContext';
import Register from 'dialogs/Register';

import { ReactComponent as Person } from 'assets/images/workflow-person.svg';
import { ReactComponent as PersonDark } from 'assets/images/workflow-person_dark.svg';
import { ReactComponent as TaskColumns } from 'assets/images/task_columns.svg';
import { ReactComponent as TaskColumnsDark } from 'assets/images/task_columns_dark.svg';
import { getAppTheme } from 'service/theme';

const WelcomePage: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);
  const appTheme = getAppTheme();
  document.body.className = `theme-${appTheme}`;

  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: 'Đăng ký' }
    });
  };

  return (
    <div className="welcome-section">
      <section className="welcome-section__introduction">
        {appTheme === 'dark' ? (
          <PersonDark role="presentation" name="person_task_board" className="person-image" />
        ) : (
          <Person role="presentation" name="person_task_board" className="person-image" />
        )}

        <div className="welcome-section__introduction__text-subsection">
          <h1>Work-Flow</h1>
          <hr className="line-break" />
          <h2>Làm việc hợp tác hơn và hoàn thành nhiều việc hơn.</h2>
          <p>
            Work-Flow là một ứng dụng tạo danh sách kiểu Kanban dựa trên web được sử dụng để quản lý
            công việc tại cấp độ cá nhân hoặc tổ chức. Sử dụng ứng dụng này tổ chức công việc của
            bạn sẽ được dễ!!
          </p>
          <Button onClick={openRegisterModal} variant="glow" className="join-now">
            Tham gia ngay
          </Button>
        </div>
      </section>
      <section className="welcome-section__explainer">
        <div className="welcome-section__explainer__text-subsection">
          <h2>Nhiệm vụ</h2>
          <ul>
            <li>Thêm nhiệm vụ</li>
            <li>Gán chúng cho đồng đội của bạn</li>
            <li>Thêm thẻ tùy chỉnh để phân biệt các nhiệm vụ trong nháy mắt</li>
            <li>Tận hưởng quy trình làm việc suôn sẻ và có tổ chức</li>
          </ul>
        </div>
        {appTheme === 'dark' ? (
          <TaskColumnsDark className="task-columns-image" />
        ) : (
          <TaskColumns className="task-columns-image" />
        )}
      </section>
    </div>
  );
};

export default WelcomePage;
