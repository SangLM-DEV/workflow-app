import React from "react";
import Pagination from "components/general/Pagination/Pagination";
import BoardCard from "components/board/BoardCard";
import { BoardContainerProps } from "./";

import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  boards,
  togglePinBoard,
  removeBoard,
  page,
  className,
  changePage = () => undefined,
  noBoardsMessage = "empty",
}) => {
  console.log("boards---", boards);
  
  return (
    <div className={`board-container ${className || ""}`}>
      <section className="board-container__boards">
        {boards.map(({ _id, pinned, name, isAuthor, estimatedTime }) => (
          <BoardCard
            key={_id}
            boardId={_id}
            isPinned={pinned}
            pinBoard={() => togglePinBoard(_id)}
            removeBoard={removeBoard}
            boardName={name}
            isAuthor={isAuthor}
            estimatedTime={estimatedTime}
          />
        ))}
      </section>
      {boards.length < 1 && <i className="board-container__empty-message">{noBoardsMessage}</i>}
      {!!page && <Pagination {...page} handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
