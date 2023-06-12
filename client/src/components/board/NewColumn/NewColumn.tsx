import React, { ChangeEvent, useState } from 'react';

import { createColumn } from 'service';
import { NewColumnProps } from './';
import './NewColumn.scss';
import './NewColumn-dark.scss';

//Hàm tạo cột mới
const NewColumn: React.FC<NewColumnProps> = ({ boardId }) => {
  const [columnName, setColumnName] = useState<string>('');

  const handleNewColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColumnName = event.target.value;
    if (newColumnName.length < 20) {
      setColumnName(newColumnName);
    }
  };

  //hàm tạo cột mới
  const createNewColumn = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && columnName.trim() !== '') {
      createColumn({
        boardId,
        payload: { name: columnName },
        res: (response) => {
          if (!response.error) setColumnName('');
        }
      });
    }
  };
  return (
    <div className="add-new-column">
      <input
        onKeyDown={createNewColumn}
        value={columnName}
        onChange={handleNewColumnChange}
        type="text"
        placeholder="+ Cột mới"
      />
    </div>
  );
};

export default NewColumn;
