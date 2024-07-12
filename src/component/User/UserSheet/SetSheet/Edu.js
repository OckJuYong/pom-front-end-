import React, { useState } from "react";
import styles from "./SetUserSheet.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  setEduEndDate,
  setEduPassedDay,
  setEduStartDate,
  setEduStatus,
  setEducation,
  setGrade,
  setMajor,
  setPlural,
  setPluralType,
  setSchoolName,
  setStandardGrade,
} from "../../../../store";

const Edu = () => {
  const dispatch = useDispatch();

  const [school, setSchool] = useState();

  const user = useSelector((state) => {
    return state.usersheet;
  });

  return (
    <div>
      <div>
        <span>학력을 기재해 주세요.</span>
        <select
          onChange={(event) => {
            setSchool(event.target.value);
          }}
        >
          <option value={""}>학력 구분 선택*</option>
          <option value={1}>초등학교 졸업</option>
          <option value={2}>중학교 졸업</option>
          <option value={3}>고등학교 졸업</option>
          <option value={4}>대학ㆍ대학원 이상 졸업</option>
          <option value={5}>기타 학력 졸업</option>
        </select>
        <Data value={school} user={user} dispatch={dispatch} />
      </div>
    </div>
  );
};

const Data = ({ value, user, dispatch }) => {
  const [isGrad, setIsGrad] = useState("");

  const [qualif, setQualif] = useState("");

  const datePickerFormat = "YYYY-MM";

  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
  };

  if (value == 1 || value == 2) {
    return (
      <div>
        <label htmlFor="qualification">검정고시</label>
        <input
          type="checkbox"
          value={"n"}
          id="qualification"
          onChange={(e) => {
            setQualif(e.target.value);
            // 검정고시 선택되면 나머지 전부 '검정고시'로 통일
          }}
        />
        {qualif == "n" ? (
          <GED
            user={user}
            dispatch={dispatch}
            datePickerUtils={datePickerUtils}
          />
        ) : (
          <div>
            <input
              type="text"
              placeholder="학교명"
              onChange={(e) => {
                dispatch(setSchoolName(e.target.value));
              }}
            />
            <select
              onChange={(e) => {
                dispatch(setEduStatus(e.target.value));
              }}
            >
              <option value={""}>졸업여부*</option>
              <option value={"졸업"}>졸업</option>
              <option value={"중퇴"}>중퇴</option>
            </select>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="입학년월"
                value={user.education.start_period}
                format="YYYY / MM"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setEduStartDate(day));
                }}
              />
              <DatePicker
                label="졸업년월"
                value={user.education.end_period}
                format="YYYY / MM"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setEduEndDate(day));
                }}
              />
            </LocalizationProvider>
          </div>
        )}
      </div>
    );
  }
  if (value == 3) {
    return (
      <div>
        <input
          type="checkbox"
          value={"n"}
          id="qualification"
          onClick={() => {}}
          onChange={(e) => {
            setQualif(e.target.value);
            // 검정고시 선택되면 나머지 전부 '검정고시'로 통일
          }}
        />
        <label htmlFor="qualification">검정고시</label>

        {qualif == "n" ? (
          <GED
            user={user}
            dispatch={dispatch}
            datePickerUtils={datePickerUtils}
          />
        ) : (
          <div>
            <input
              type="text"
              placeholder="학교명"
              onChange={(e) => {
                dispatch(setSchoolName(e.target.value));
              }}
            />
            <select
              onChange={(e) => {
                dispatch(setEduStatus(e.target.value));
              }}
            >
              <option value={""}>졸업여부*</option>
              <option value={"졸업"}>졸업</option>
              <option value={"재학"}>재학</option>
              <option value={"휴학"}>휴학</option>
              <option value={"중퇴"}>중퇴</option>
              <option value={"자퇴"}>자퇴</option>
              <option value={"졸업예정"}>졸업예정</option>
            </select>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={datePickerUtils}
            >
              <DatePicker
                label="입학년월"
                value={user.education.start_period}
                format="YYYY / MM"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setEduStartDate(day));
                }}
              />
              <DatePicker
                label="졸업년월"
                value={user.education.end_period}
                format="YYYY / MM"
                onChange={(newVal) => {
                  const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                    2,
                    "0"
                  )}-${String(newVal.$D).padStart(2, "0")}`;
                  dispatch(setEduEndDate(day));
                }}
              />
            </LocalizationProvider>
            <br />
            <select
              onChange={(e) => {
                dispatch(setEducation(e.target.value));
              }}
            >
              <option value={""}>전공계열*</option>
              <option value={"문과계열"}>문과계열</option>
              <option value={"이과계열"}>이과계열</option>
              <option value={"전문(실업)계"}>전문(실업)계</option>
              <option value={"예체능계"}>예체능계</option>
              <option value={"특성화/마이스터고"}>특성화/마이스터고</option>
              <option value={"특수목적고"}>특수목적고</option>
            </select>
          </div>
        )}
      </div>
    );
  }
  if (value == 4) {
    return (
      <div>
        <select
          onChange={(e) => {
            dispatch(setEducation(e.target.value));
          }}
        >
          <option value={""}>대학구분*</option>
          <option value={"2년제"}>대학교(2년)</option>
          <option value={"3년제"}>대학교(3년)</option>
          <option value={"4년제"}>대학교(4년)</option>
          <option value={"석사"}>대학원(석사)</option>
          <option value={"박사"}>대학원(박사)</option>
        </select>
        <input
          type="text"
          placeholder="학교명"
          onChange={(e) => {
            dispatch(setSchoolName(e.target.value));
          }}
        />
        <input
          placeholder="전공*"
          onChange={(e) => {
            dispatch(setMajor(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            dispatch(setEduStatus(e.target.value));
          }}
        >
          <option value={""}>졸업여부*</option>
          <option value={"졸업"}>졸업</option>
          <option value={"재학"}>재학</option>
          <option value={"휴학"}>휴학</option>
          <option value={"중퇴"}>중퇴</option>
          <option value={"자퇴"}>자퇴</option>
          <option value={"졸업예정"}>졸업예정</option>
        </select>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateFormats={datePickerUtils}
        >
          <DatePicker
            label="입학년월"
            value={user.education.start_period}
            format="YYYY / MM"
            onChange={(newVal) => {
              const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                2,
                "0"
              )}-${String(newVal.$D).padStart(2, "0")}`;
              dispatch(setEduStartDate(day));
            }}
          />
          <DatePicker
            label="졸업년월"
            value={user.education.end_period}
            format="YYYY / MM"
            onChange={(newVal) => {
              const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                2,
                "0"
              )}-${String(newVal.$D).padStart(2, "0")}`;
              dispatch(setEduEndDate(day));
            }}
          />
        </LocalizationProvider>
        <input
          placeholder="학점"
          onChange={(e) => {
            dispatch(setGrade(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            dispatch(setStandardGrade(e.target.value));
          }}
        >
          <option value={""}>기준학점</option>
          <option value={"4"}>4.0</option>
          <option value={"4.3"}>4.3</option>
          <option value={"4.5"}>4.5</option>
        </select>
        <input
          placeholder="추가전공"
          onChange={(e) => {
            dispatch(setPlural(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            dispatch(setPluralType(e.target.value));
          }}
        >
          <option value={""}>전공구분*</option>
          <option value={"부전공"}>부전공</option>
          <option value={"복수전공"}>복수전공</option>
          <option value={"이중전공"}>이중전공</option>
        </select>
      </div>
    );
  }
  if (value == 5) {
    return (
      <div>
        <select
          onChange={(e) => {
            dispatch(setEducation(e.target.value));
          }}
        >
          <option value={""}>인정학력*</option>
          <option value={"2년제"}>대학(2년)</option>
          <option value={"3년제"}>대학(3년)</option>
          <option value={"4년제"}>대학교(4년)</option>
        </select>
        <input
          placeholder="학교/학원명*"
          onChange={(e) => {
            dispatch(setSchoolName(e.target.value));
          }}
        />
        <br />
        <input
          placeholder="전공분야*"
          onChange={(e) => {
            dispatch(setMajor(e.target.value));
          }}
        />
        <select
          onChange={(e) => {
            dispatch(setEduStatus(e.target.value));
          }}
        >
          <option value={""}>졸업여부*</option>
          <option value={"졸업"}>졸업</option>
          <option value={"재학"}>재학</option>
          <option value={"휴학"}>휴학</option>
          <option value={"중퇴"}>중퇴</option>
          <option value={"자퇴"}>자퇴</option>
          <option value={"졸업예정"}>졸업예정</option>
        </select>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateFormats={datePickerUtils}
        >
          <DatePicker
            label="입학년월"
            value={user.education.start_period}
            format="YYYY / MM"
            onChange={(newVal) => {
              const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                2,
                "0"
              )}-${String(newVal.$D).padStart(2, "0")}`;
              dispatch(setEduStartDate(day));
            }}
          />
          <DatePicker
            label="졸업년월"
            value={user.education.end_period}
            format="YYYY / MM"
            onChange={(newVal) => {
              const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
                2,
                "0"
              )}-${String(newVal.$D).padStart(2, "0")}`;
              dispatch(setEduEndDate(day));
            }}
          />
        </LocalizationProvider>
      </div>
    );
  }
  return null;
};

// const IsTest = ({ value }) => {
//   const datePickerFormat = "YYYY-MM";
//   const datePickerUtils = {
//     format: datePickerFormat,
//     parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
//     // You can add other utils as needed, such as `isValid`, etc.
//   };

//   if (value == "Y") {
//     return (
//       <div>
//         <LocalizationProvider
//           dateAdapter={AdapterDayjs}
//           dateFormats={datePickerUtils}
//         >
//           <DatePicker
//             label="입학년월"
//             value={date}
//             format="YYYY / MM"
//             onChange={(newVal) => {
//               const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
//                 2,
//                 "0"
//               )}-${String(newVal.$D).padStart(2, "0")}`;
//               dispatch(setEduStartDate(day));
//             }}
//           />
//           <DatePicker
//             label="졸업년월"
//             value={date}
//             format="YYYY / MM"
//             onChange={(newVal) => {
//               const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
//                 2,
//                 "0"
//               )}-${String(newVal.$D).padStart(2, "0")}`;
//               dispatch(setEduStartDate(day));
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//     );
//   }
// };

const GED = ({ user, datePickerUtils, dispatch }) => {
  return (
    <div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={datePickerUtils}
      >
        <DatePicker
          label="합격년월"
          value={user.education}
          format="YYYY / MM / DD"
          onChange={(newVal) => {
            const day = `${newVal.$y}-${String(newVal.$M + 1).padStart(
              2,
              "0"
            )}-${String(newVal.$D).padStart(2, "0")}`;
            dispatch(setEduPassedDay(day));
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Edu;
