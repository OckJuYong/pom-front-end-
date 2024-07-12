import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import img from "../../../../test.jpg";

import styles from "./SetUserSheet.module.css";
import Army from "./Army";
import Edu from "./Edu";
import His from "./His";
import Tech from "./Tech";
import Lang from "./Lang";
import Award from "./Award";
import { useSelector } from "react-redux";

import axios from "axios";

const SetUserSheet = () => {
  let user = useSelector((state) => {
    return state.usersheet;
  });

  const [fade, setFade] = useState();

  useEffect(() => {
    let a = setTimeout(() => {
      setFade(styles.end);
    }, 0);
    return () => {
      clearTimeout(a);
      setFade();
    };
  }, []);

  return (
    <div className={`setResumeWrap ${styles.start} ${fade}`}>
      <div className={styles.resumeCon}>
        <form className={styles.flexResume}>
          <section className={styles.defaultStatusFlex}>
            <img
              alt="증명사진"
              src={img}
              style={({ height: "132px" }, { width: "103px" })}
            />
            <ul className={styles.userinfo}>
              <li>이름 : 김영권</li>
              <li>이메일 : 1234@1234</li>
              <li>전화번호 : 1234</li>
            </ul>
          </section>

          <section className={styles.army}>
            <Army />
          </section>
          <section>
            <Edu />
          </section>
          <section>
            <His />
          </section>
          <section>
            <Lang />
            <Tech />
          </section>
          <section>
            <Award />
          </section>
          <div className={styles.footerContainer}>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={(e) => {
                axios
                  .post(`http://211.216.233.66:5000/api/resume`, { user })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch(() => {
                    alert("Failed to POST");
                  });
              }}
            >
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUserSheet;
