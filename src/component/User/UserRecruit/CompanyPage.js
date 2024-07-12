import React, { useEffect, useState } from "react";
import styles from "./UserRecruit.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const CompanyPage = () => {
  // const posts = useSelector((state) => {
  //   return state.postList;
  // });

  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("http://211.216.233.66:5000/api/noticeboard/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        alert("Failed to GET");
      });
  }, []);

  return (
    <div className={styles.viewContainer}>
      <div className={styles.pad}></div>
      <header className={styles.Nav}>채용공고 - 기업</header>
      <div className={styles.tableWrap}>
        <nav className={styles.btnContainer}>
          <div className={styles.leftWrap}>
            <span>ㅎㅇ</span>
          </div>
          <div className={styles.rightWrap}>
            <Link className={styles.write} to={`/write-post`}>
              <span>글쓰기</span>
            </Link>
          </div>
        </nav>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>EXP.</th>
            </tr>
          </thead>
          {posts &&
            posts.map((a, i) => {
              return (
                <tr key={i} className={styles.tableposts}>
                  <td>{posts[i].id}</td>
                  <td>
                    <Link
                      className={styles.titleHref}
                      to={`/view-post/${posts[i].id}`}
                    >
                      {posts[i].title}
                    </Link>
                  </td>
                  <td>{posts[i].employmentName}</td>
                  <td>{posts[i].postTime}</td>
                  <td>{posts[i].endTime}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <aside className={styles.asideLeft}>
        <ul>
          <span>대충 그래프</span>
          <h6>이용자들이 이런 기업을 많이 보고 있어요.</h6>
        </ul>
      </aside>
      <aside className={styles.asideRight}>
        <ul>
          <span>대충 그래프</span>
          <h6>이용자들이 이런 기업을 많이 보고 있어요.</h6>
        </ul>
      </aside>
      <footer className={styles.footer} style={{ textAlign: "center" }}>
        푸터
      </footer>
    </div>
  );
};

export default CompanyPage;
