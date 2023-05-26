import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import "./BoardCard.scss";
import "./BoardCard-dark.scss";
import BoardOptions from "./BoardOptions/BoardOptions";
import { BoardcardProps } from "./";

const BoardCard: React.FC<BoardcardProps> = ({
  boardName,
  estimatedTime,
  boardId,
  pinBoard,
  removeBoard,
  isPinned = false,
  isAuthor = false,
}) => {
  const history = useHistory();

  const togglePinBoard = (e: MouseEvent) => {
    e.stopPropagation();
    pinBoard();
  };

  const goToBoard = () => {
    history.push(`/board/${boardId}`);
  };

  // Tạo một đối tượng Date từ chuỗi thời gian "1970-01-01T00:00:00.000Z"
  const date = new Date(estimatedTime);

  // Lấy giá trị giờ, phút và giây từ đối tượng Date
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");


  // Tạo chuỗi định dạng thời gian "HH:MM:SS"
  const formattedTime = `${hours}:${minutes}`;


  return (
    <div data-testid={boardId} aria-label="Board card" className="board-card">
      <div role="presentation" className="board-card__columns">
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
      </div>
      <div className="board-card__content">
        <h1 onClick={goToBoard} className="board-card__content__title">
          {boardName}
        </h1>
        <p>{formattedTime}</p>
        <div className="board-card__content__menu">
          <span
            className="board-card__content__menu__icon"
            role="button"
            onClick={togglePinBoard}
            data-testid={`${boardId}-pin-btn`}
          >
            {isPinned ? (
              <Pined data-testid={`${boardId}-pinned`} />
            ) : (
              <Pin data-testid={`${boardId}-pin`} />
            )}
          </span>
          <BoardOptions
            boardId={boardId}
            removeBoardCallback={removeBoard}
            isAuthor={isAuthor}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
