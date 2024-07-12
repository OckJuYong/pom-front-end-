import React, { useState } from "react";
import styles from "./SetUserSheet.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addAward,
  deleteAward,
  setAwardGetDay,
  setPrizeNm,
  setPrizeOrgan,
} from "../../../../store";

const Award = () => {
  let [cnt, setCnt] = useState(0);

  let dispatch = useDispatch();

  let CallbackParameter = (i, day) => {
    return [i, day];
  };

  let user = useSelector((state) => {
    return state.usersheet;
  });

  const datePickerFormat = "YYYY-MM";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
  };

  return (
    <div>
      {user.award.map(function (a, i) {
        return (
          <div key={i} className={styles.award_title}>
            <label htmlFor="prizeName">수상∙공모전명</label>
            <input
              placeholder="수상∙공모전명"
              id="prizeName"
              onChange={(e) => {
                dispatch(setPrizeNm(CallbackParameter(i, e.target.value)));
              }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="수상일"
                value={user.award.award_get}
                format="YYYY / MM / DD"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setAwardGetDay(CallbackParameter(i, day)));
                }}
              />
            </LocalizationProvider>

            <label htmlFor="prizeName">수여∙주최기관</label>
            <input
              placeholder="수여∙주최기관"
              id="prizeOrgan"
              onChange={(e) => {
                dispatch(setPrizeOrgan(CallbackParameter(i, e.target.value)));
              }}
            />
            <button
              type="button"
              className="deleteTechBtn"
              onClick={(e) => {
                setCnt((cnt -= 1));
                dispatch(deleteAward(user.award[i].id));
              }}
            >
              X
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={(e) => {
          setCnt((cnt += 1));
          dispatch(
            addAward({
              id: cnt,
              awards_name: "",
              awards_authority: "",
              awards_get: "",
            })
          );
          console.log(user.award);
        }}
      >
        추가하기
      </button>
    </div>
  );
};

export default Award;
