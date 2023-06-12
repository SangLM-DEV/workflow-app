import React, { useRef, useContext } from 'react';
import DropdownMenu from 'components/general/DropdownMenu/DropdownMenu';
import DropdownMenuItem from 'components/general/DropdownMenu/DropdownMenuItem';
import { FaEllipsisV, FaEdit, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';
import { leaveBoard, deleteBoard } from 'service';
import BoardUpdate from 'dialogs/BoardEditor/BoardUpdate';
import { ModalContext, ModalActionType } from 'context/ModalContext';
import { BoardOptionsProps } from './';
import './BoardOptions.scss';

const BoardOptions: React.FC<BoardOptionsProps> = ({ boardId, removeBoardCallback, isAuthor }) => {
  const moreOptionsAnchor = useRef<HTMLButtonElement>(null);
  const { modalDispatch } = useContext(ModalContext);

  //Hàm mở modal sửa thông tin bảng
  const editEventModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        title: 'Sửa bảng',
        render: <BoardUpdate boardId={boardId} />
      }
    });
  };

  //Hàm rời sự kiện
  const leavingEvent = async () => {
    const { error } = await leaveBoard({ boardId });
    if (!error) removeBoardCallback(boardId);
  };

  //Hàm xóa bảng
  const deleteBoardHandler = async () => {
    const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa bảng này không?');
    if (shouldDelete) {
      const { error } = await deleteBoard({ boardId });
      if (!error) removeBoardCallback(boardId);
    }
  };

  return (
    <div className="board-options">
      <button
        data-testid={`${boardId}-options`}
        className="board-options__ellipsis"
        ref={moreOptionsAnchor}>
        <FaEllipsisV />
      </button>
      <DropdownMenu
        data-testid="dropdown-menu"
        className="board-options__menu"
        anchorEl={moreOptionsAnchor}>
        {isAuthor && (
          <DropdownMenuItem onClick={editEventModal}>
            <FaEdit /> Sửa
          </DropdownMenuItem>
        )}
        {isAuthor && (
          <DropdownMenuItem onClick={deleteBoardHandler}>
            <FaTrashAlt /> Xóa
          </DropdownMenuItem>
        )}
        {!isAuthor && (
          <DropdownMenuItem onClick={leavingEvent}>
            <FaSignOutAlt />
            Rời đi
          </DropdownMenuItem>
        )}
      </DropdownMenu>
    </div>
  );
};

export default BoardOptions;
