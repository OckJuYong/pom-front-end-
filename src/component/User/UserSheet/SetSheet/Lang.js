import React, { useState } from "react";
import styles from "./SetUserSheet.module.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";

import {
  addLang,
  deleteLang,
  setLang,
  setLangCertGetDay,
  setLangTestNm,
  setLangTestRank,
} from "../../../../store.js";

const Lang = () => {
  let [cnt, setCnt] = useState(0);

  let dispatch = useDispatch();

  let user = useSelector((state) => {
    return state.usersheet;
  });

  let CallbackParameter = (i, day) => {
    return [i, day];
  };

  const datePickerFormat = "YYYY-MM-DD";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
  };

  return (
    <div className={styles.lang_title}>
      {user.lang.map((a, i) => {
        return (
          <div key={i} className={styles.LangInputContainer}>
            <select
              onChange={(e) => {
                dispatch(setLang(CallbackParameter(i, e.target.value)));
              }}
            >
              <option value={""}>언어*</option>
              <option value={"영어"}>영어</option>
              <option value={"일본어"}>일본어</option>
              <option value={"중국어"}>중국어</option>
              <option value={"독일어"}>독일어</option>
              <option value={"불어"}>불어</option>
              <option value={"스페인어"}>스페인어</option>
              <option value={"이탈리아어"}>이탈리아어</option>
              <option value={"러시아어"}>러시아어</option>
              <option value={"한국어"}>한국어</option>
            </select>
            <input
              placeholder="언어시험명 입력"
              onChange={(e) => {
                dispatch(setLangTestNm(CallbackParameter(i, e.target.value)));
              }}
            ></input>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="취득일"
                value={user.lang.lang_date}
                format="YYYY / MM / DD"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setLangCertGetDay(CallbackParameter(i, day)));
                }}
              />
            </LocalizationProvider>
            <input
              placeholder="급수, 혹은 점수*"
              onChange={(e) => {
                dispatch(setLangTestRank(CallbackParameter(i, e.target.value)));
              }}
            />
            {/* <input
              type="number"
              placeholder="점수*"
              maxLength={"5"}
              required
              onChange={(e) => {
                dispatch(setLangScore(CallbackParameter(i, e.target.value)));
              }}
            /> */}
            <br />
            <button
              type="button"
              className={styles.deleteLangBtn}
              onClick={() => {
                dispatch(deleteLang(user.lang[i].id));
                --cnt;
              }}
            >
              X
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          dispatch(
            addLang({
              id: ++cnt,
              lang_name: "",
              lang_score: "",
              lang_date: "",
            })
          );
          console.log(user.tech);
        }}
      >
        추가하기
      </button>
    </div>
  );
};

export default Lang;
