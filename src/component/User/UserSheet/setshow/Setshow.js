import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../../../store";
import style from "./Setshow.module.css";

const Setshow = () => {
  const [a, setA] = useState();
  const [selec, setSelec] = useState([]);

  let dispatch = useDispatch();

  let selected = useSelector((state) => {
    return state.selection;
  });

  useEffect(() => {
    let arr = [...selec];
    arr[selected.selec] = "selected";
    setSelec(arr);
  }, []);

  return (
    <div>
      <select
        onChange={(e) => {
          dispatch(modify(e.target.value));
        }}
      >
        <option value selected>
          번호를 선택하세요
        </option>
        <option value="1" selected={selec[1]}>
          1번
        </option>
        <option value="2" selected={selec[2]}>
          2번
        </option>
      </select>

      <Show selected={selected} />
    </div>
  );
};

const Show = ({ selected }) => {
  if (selected.selec === "1") {
    return (
      <div className={style.modal}>
        <span>1번 모달</span>
      </div>
    );
  } else if (selected.selec === "2") {
    return (
      <div className={style.modal}>
        <span>2번 모달</span>
      </div>
    );
  }
};

export default Setshow;
