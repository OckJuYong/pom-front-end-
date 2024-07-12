import React, { useState } from "react";
import styles from "./SetUserSheet.module.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";

import {
  addHis,
  deleteHis,
  setEndHis,
  setHisCompanyNm,
  setHisDepartment,
  setHisPosition,
  setStartHis,
} from "../../../../store.js";

import Calendar from "react-calendar";

const His = () => {
  let [cnt, setCnt] = useState(0);

  const datePickerFormat = "YYYY-MM-DD";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
  };

  let dispatch = useDispatch();

  let user = useSelector((state) => {
    return state.usersheet;
  });

  let CallbackParameter = (i, value) => {
    return [i, value];
  };

  return (
    <div className={styles.his_title}>
      {user.history.map(function (a, i) {
        return (
          <div className={styles.HistoryInputContainer} key={i}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="입사일"
                value={user.history.history_start_period}
                format="YYYY / MM / DD"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setStartHis(CallbackParameter(i, day)));
                }}
              />
              <DatePicker
                label="퇴사일"
                value={user.history.history_end_period}
                format="YYYY / MM / DD"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setEndHis(CallbackParameter(i, day)));
                  console.log(user.history);
                }}
              />
            </LocalizationProvider>
            <input
              className={styles.CompanyName}
              placeholder={"회사명*"}
              onChange={(e) => {
                // history_company
                dispatch(setHisCompanyNm(CallbackParameter(i, e.target.value)));
              }}
            />
            <input
              className={styles.Detail}
              placeholder={"직급/직책*"}
              onChange={(e) => {
                // history_position
                dispatch(setHisPosition(CallbackParameter(i, e.target.value)));
              }}
            />
            <input
              className={styles.Detail}
              placeholder={"근무부서*"}
              onChange={(e) => {
                // history_department
                dispatch(
                  setHisDepartment(CallbackParameter(i, e.target.value))
                );
              }}
            />
            <br />
            <button
              type="button"
              className={styles.deleteHisBtn}
              onClick={() => {
                setCnt((cnt -= 1));
                dispatch(deleteHis(user.history[i].id));
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
          setCnt((cnt += 1));
          dispatch(
            addHis({
              id: cnt,
              history_start_period: "",
              history_end_period: "",
              history_company: "",
              history_position: "",
              history_department: "",
            })
          );
        }}
      >
        추가하기
      </button>
    </div>
  );
};

export default His;
