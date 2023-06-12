import React, { useState, useContext, useRef } from 'react';
import './Column.scss';
import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Task from 'components/board/Task';
import DropdownMenu from 'components/general/DropdownMenu/DropdownMenu';
import DropdownMenuItem from 'components/general/DropdownMenu/DropdownMenuItem';
import { ModalContext, ModalActionType } from 'context/ModalContext';
import { TaskContext, TasksActionType } from 'context/TaskContext';
import { UserContext } from 'context/UserContext';
import ColumnNameInput from './ColumnNameInput';
import { updateBoardColumn } from 'service';
import { deleteColumn } from 'service';

import { Droppable } from 'react-beautiful-dnd';

import TaskCreate from 'dialogs/TaskEditor/TaskCreate';
import { ColumnProps } from './';
import { UserBoardRoles } from 'types/general';

//Hàm nhận dữ liệu cột
const Column: React.FC<ColumnProps> = ({
  columnName,
  columnId,
  columnIndex,
  boardId,
  listOfTasks
}) => {
  const { modalDispatch } = useContext(ModalContext);
  const { tasksDispatch } = useContext(TaskContext);
  const {
    userState: { currentBoard }
  } = useContext(UserContext);

  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const anchorElement = useRef(null);

  //Mở phương thức thẻ của bảng
  const openBoardTagsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <TaskCreate columnId={columnId} boardId={boardId} />,
        title: 'Nhiệm vụ mới',
        size: 'l'
      }
    });
  };

  //Hàm xóa cột
  const removeColumn = async () => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa cột này không?');
    if (shouldDelete) {
      deleteColumn({ boardId, payload: { columnId, columnIndex } });
    }
  };

  //hàm kích hoạt tên cột chỉnh sửa đầu vào
  const activateColumnNameEditInput = () => {
    setShowTitleInput(true);
  };

  //hàm vô hiệu hóa tên cột chỉnh sửa đầu vào
  const dissableColumnNameEditInput = () => {
    setShowTitleInput(false);
  };

  //Hàm thay đổi tên cột khi ấn Enter
  const changeColumnNameOnKeyPressEnter = async (newName: string) => {
    const { status } = await updateBoardColumn({
      boardId,
      columnId,
      payload: {
        name: newName
      }
    });
    if (status === 200) {
      tasksDispatch({
        type: TasksActionType.CHANGE_COLUMN_NAME,
        payload: {
          columnId,
          newName
        }
      });
      setShowTitleInput(false);
    }
  };

  //Hàm ủy quyền / phân quyền
  const isAuthorized = () => {
    const { role } = currentBoard;
    return role === UserBoardRoles.ADMIN || role === UserBoardRoles.OWNER;
  };

  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-column ${snapshot.isDraggingOver ? 'task-column--active' : ''}`}>
            <header className="task-column__header">
              <span className="task-column__header__task-count">{listOfTasks.length}</span>
              <ColumnNameInput
                hideInput={dissableColumnNameEditInput}
                initialVal={columnName}
                onEnter={changeColumnNameOnKeyPressEnter}
                editTitle={showTitleInput}
              />
              {currentBoard.role !== UserBoardRoles.GUEST && (
                <button onClick={openBoardTagsModal} className="task-column__header__new-task-btn">
                  <FaRegPlusSquare />
                </button>
              )}

              {isAuthorized() && (
                <>
                  <button ref={anchorElement} className="task-column__header__more-options">
                    <FaEllipsisV />
                  </button>
                  <DropdownMenu anchorEl={anchorElement} className="column-more-options">
                    <DropdownMenuItem onClick={removeColumn}>
                      <FaTrashAlt />
                      Xóa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={activateColumnNameEditInput}>
                      <FaEdit />
                      Sửa
                    </DropdownMenuItem>
                  </DropdownMenu>
                </>
              )}
            </header>
            <div className="task-column__container scrollbar">
              {listOfTasks &&
                listOfTasks.map(({ _id, title, tags, people }, index) => (
                  <Task
                    key={_id}
                    taskId={_id}
                    title={title}
                    tags={tags}
                    people={people}
                    indexes={{ taskIndex: index, columnIndex }}
                  />
                ))}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
