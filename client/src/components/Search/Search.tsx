import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import style from "./Search.module.css";

interface Props {
  labelName: string;
  buttonName: string;
  actionName: any;
}

const Search = ({ labelName, buttonName, actionName }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const handleDispatch = () => {
    dispatch(actionName(value));
  };

  return (
    <div className={style.searchContainer}>
      <div className={style.input}>
        <label htmlFor='search'>{labelName}</label>
        <input
          onChange={handleInputChange}
          id='search'
          type='search'
          autoComplete='off'
        />
      </div>
      <button onClick={handleDispatch}>{buttonName}</button>
    </div>
  );
};

export default Search;
