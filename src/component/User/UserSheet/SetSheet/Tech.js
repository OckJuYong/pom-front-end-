import React, { useMemo, useState } from "react";
import styles from "./SetUserSheet.module.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";

import {
  addTech,
  deleteTech,
  setTechCertGetDay,
  setTechCertIssuer,
  setTechCertNm,
} from "../../../../store.js";

const Tech = () => {
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
    <div className={styles.Tech}>
      {user.tech.map(function (a, i) {
        return (
          <div className={styles.TechInputContainer} key={i}>
            <input
              placeholder="자격증명*"
              onChange={(e) => {
                dispatch(setTechCertNm(CallbackParameter(i, e.target.value)));
              }}
            />
            <input
              placeholder="발행처/기관*"
              onChange={(e) => {
                dispatch(
                  setTechCertIssuer(CallbackParameter(i, e.target.valueAsDate))
                );
              }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="취득일"
                value={user.tech.tech_get_day}
                format="YYYY / MM / DD"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setTechCertGetDay(CallbackParameter(i, day)));
                }}
              />
            </LocalizationProvider>
            <button
              type="button"
              className="deleteTechBtn"
              onClick={(e) => {
                setCnt((cnt -= 1));
                dispatch(deleteTech(user.tech[i].id));
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
            addTech({
              id: cnt,
              tech_name: "",
              tech_get_day: "",
              tech_issuer: "",
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

export default Tech;
