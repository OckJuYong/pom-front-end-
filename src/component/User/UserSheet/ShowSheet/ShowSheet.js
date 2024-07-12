import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ShowSheet.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ShowSheet = () => {
  const LOAD = "None...";
  const [fade, setFade] = useState("");
  const [user, setUser] = useState();

  const hFocus = useRef([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let a = setTimeout(() => {
      setFade(styles.end);
    }, 0);
    return () => {
      clearTimeout(a);
      setFade();
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://211.216.233.66:5000/api/resume`, {
        params: {
          userId: "김영권",
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        alert("Server Disconnected");
      });
  }, []);

  return (
    <div className={`${styles.Container} ${styles.start} ${fade}`}>
      <div className={styles.showContainer}>
        <div className={styles.Contents}>
          <div className={styles.showResume}>
            <div className={styles.armyContainer}>
              <div className={styles.underbar}>
                <h3>병역</h3>
              </div>
              {user ? <ArmyState user={user} LOAD={LOAD} /> : LOAD}
            </div>
            <div className={styles.eduContainer}>
              <div className={styles.underbar}>
                <h3 ref={hFocus[0]}>학력</h3>
              </div>
              <div className={styles.eduElement}>
                <h6>
                  학력 : {user ? user.education.edu_level : LOAD}{" "}
                  <span>( {user ? user.education.status : LOAD})</span>{" "}
                </h6>
                <h6>
                  재학기간 :{" "}
                  {user
                    ? user.education.start_period +
                      "/" +
                      user.education.end_period
                    : LOAD}
                </h6>
                <h6>학교명 : {user ? user.education.school_name : LOAD}</h6>
                <h6>전공 : {user ? user.education.major : LOAD}</h6>
                <h6>
                  학점 : {user ? user.education.grade : LOAD}
                  <span>{user ? user.education.standard_grade : LOAD}</span>
                </h6>
                <h6>복수학위 : {user ? user.education.plural_type : LOAD}</h6>
                <h6>
                  복수 전공명 : {user ? user.education.plural_name : LOAD}
                </h6>
              </div>
            </div>
            <div className={styles.hisContainer}>
              <div className={styles.underbar}>
                <h3 ref={hFocus[1]}>경력</h3>
              </div>
              {user &&
                user.history &&
                user.history.map((a, i) => {
                  return (
                    <ul key={i} className={styles.hisElement}>
                      <li>
                        <p>
                          입사기간 :{" "}
                          {user
                            ? user.history[i].history_start_period +
                              "/" +
                              user.history[i].history_end_period
                            : LOAD}
                        </p>
                        <p>
                          회사이름 :{" "}
                          {user ? user.history[i].history_company : LOAD}
                        </p>
                        <p>
                          주요업무/직책 :{" "}
                          {user ? user.history[i].history_position : LOAD}
                        </p>
                      </li>
                    </ul>
                  );
                })}
            </div>

            <div className={styles.techContainer}>
              <div className={styles.underbar}>
                <h3 ref={hFocus[2]}>기술 자격증</h3>
              </div>
              {user &&
                user.tech &&
                user.tech.map((a, i) => {
                  return (
                    <div key={i} className={styles.techElement}>
                      <div>
                        <h5>{user ? user.tech[i].tech_name : LOAD}</h5>
                        <p>
                          취득일 : {user ? user.tech[i].tech_get_day : LOAD}
                        </p>
                        <p>발급처 : {user ? user.tech[i].tech_issuer : LOAD}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className={styles.langContainer}>
              <div className={styles.underbar}>
                <h3 ref={hFocus[3]}>어학 자격증</h3>
              </div>
              {user &&
                user.lang &&
                user.lang.map((a, i) => {
                  return (
                    <div key={i} className={styles.langElement}>
                      <div>
                        <h5>{user ? user.lang[i].lang_test_name : LOAD}</h5>
                        <p>급수 : {user ? user.lang[i].lang_name : LOAD}</p>
                        <p>점수 : {user ? user.lang[i].lang_score : LOAD}</p>
                        <p>취득일 : {user ? user.lang[i].lang_date : LOAD}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className={styles.awardContainer}>
              <div className={styles.underbar}>
                <h3 ref={hFocus[4]}>수상 경력</h3>
              </div>
              {user &&
                user.award &&
                user.award.map((a, i) => {
                  return (
                    <ul key={i} className={styles.awardElement}>
                      <li>
                        <p>
                          수상이름 : {user ? user.award[i].award_name : LOAD}
                        </p>
                        <p>
                          대회주최기관 :{" "}
                          {user ? user.award[i].award_organization : LOAD}
                        </p>
                        <p>취득일 : {user ? user.award[i].award_get : LOAD}</p>
                      </li>
                    </ul>
                  );
                })}
            </div>
            <div className={styles.NavContainer}>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                병역사항
              </span>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                학력사항
              </span>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                경력사항
              </span>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                기술 자격증
              </span>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                어학 자격증
              </span>
              <span
                className={styles.child}
                onClick={() => {
                  hFocus.current.focus();
                }}
              >
                수상내역
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <button className={styles.ModifyBtn}>
          <Link
            style={{
              textDecoration: "none",
              margin: "10px",
              marginTop: "8px",
              color: "black",
            }}
            to={"/modify"}
          >
            수정하기
          </Link>
        </button>
        <button
          className={styles.tmp}
          onClick={() => {
            axios
              .post(`http://211.216.233.66:5000/api/resume`, {
                params: {
                  userId: "1234",
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((res) => {
                alert("Error");
              });
          }}
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default ShowSheet;

const ArmyState = ({ user, LOAD }) => {
  if (user.army_yn == "Y") {
    return (
      <div className={styles.armyElement}>
        <h6>
          복무기간 :{" "}
          {user ? user.army_start_period + "/" + user.army_end_period : LOAD}
        </h6>
        <h6>군별 : {user ? user.army_position : LOAD}</h6>
        <h6>계급 : {user ? user.army_rank : LOAD}</h6>
        <h6>군번 : {user ? user.army_number : LOAD}</h6>
      </div>
    );
  } else if (user.army_yn == "N") {
    return (
      <div className={styles.armyElement}>
        <h6>병역여부 : {user ? user.army_yn : LOAD}</h6>
        <h6>면제사유 : {user ? user.reason_no_army : LOAD}</h6>
      </div>
    );
  }
};
