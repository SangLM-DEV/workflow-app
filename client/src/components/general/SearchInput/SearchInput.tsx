import React, { ChangeEvent, FormEvent, useRef } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import './SearchInput.scss';
import './SearchInput-dark.scss';
import { SearchInputProps } from '.';
import SearchResult from './SearchResult';
import { useClickOutside } from 'Hooks/useClickOutside';

//hàm tìm kiếm
const SearchInput: React.FC<SearchInputProps> = ({
  debounceTimeout,
  search,
  result,
  clickResult,
  clear
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  let watingTimeout: ReturnType<typeof setTimeout> | null = null;
  useClickOutside(searchInputRef, clear);

  //đầu vào hàm tìm kiếm
  const searchHandler = (event: FormEvent) => {
    event.preventDefault();
    const searchString = searchInputRef.current?.value as string;
    if (searchString.length > 0) search(searchString);
  };

  //hàm tìm kiếm
  const searchOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (watingTimeout) clearTimeout(watingTimeout);
    watingTimeout = setTimeout(() => {
      if (searchString.length > 0) search(searchString);
    }, debounceTimeout);
  };

  //Xóa thông tin tìm kiếm trong ô input
  const clearInputSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    clear();
  };

  return (
    <div className="search-input">
      <form onSubmit={searchHandler} className="search-input__form">
        <input
          ref={searchInputRef}
          placeholder="Tìm kiếm..."
          className="search-input__input"
          type="text"
          onChange={searchOnChangeHandler}
        />
        {result.length > 0 ? (
          <FaTimes onClick={clearInputSearch} className="search-input__icon" />
        ) : (
          <FaSearch onClick={searchHandler} className="search-input__icon" />
        )}
      </form>
      <SearchResult data={result} onClick={clickResult} />
    </div>
  );
};

export default SearchInput;
