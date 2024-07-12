import React, { useEffect, useState } from "react";
import styles from "./ViewPost.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";

const ViewPost = () => {
  // const post = useSelector((state) => {
  //   return state.savePost;
  // });

  const [show, setShow] = useState("");

  const { id } = useParams();
  const ID = parseInt(id, 10);

  const LOAD = "...Loading";

  useEffect(() => {
    axios
      .get("http://211.216.233.66:5000/api/employment", {
        params: {
          id: ID,
        },
      })
      .then((res) => {
        setShow(res.data);
      })
      .catch(() => {
        alert("Falied to GET");
      });
  }, []);

  const SOURCE = show.contents;

  return (
    <div className={styles.viewContainer}>
      <div className={styles.pad}></div>
      <header className={styles.header}>
        <h1>{show ? show.title : LOAD}</h1>
      </header>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link className={styles.toCompany} to="/company">
            <strong>{show ? show.employmentId : LOAD}</strong>
          </Link>
          <span className={styles.seperator}>·</span>
          <span>{show ? show.endTime : LOAD}</span>
        </div>
        <div className={styles.navRight}>
          <button
            className={styles.modifyBtn}
            onClick={() => {
              // 서버에서 게시글 아이디 받아서, /id=아이디 같은 주소를 타고 수정 페이지로 넘어감.
              // 수정 페이지에서 useEffect 이용해서 id 기반으로 게시글 내용, 제목 같은거 불러옴.
              // value 속성 이용해서 텍스트필드에 꽂아주면 끝.
              // 사용자는 그거 수정하게 하면 됨.
            }}
          >
            수정
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              // 대충 삭제해달라는 AJAX 요청
            }}
          >
            삭제
          </button>
        </div>
      </nav>
      <aside className={styles.asideL}></aside>
      <main className={styles.main}>
        <MarkdownPreview
          source={SOURCE}
          style={{
            whiteSpace: "pre-wrap",
            background: "white",
            color: "black",
            overflowY: "auto",
          }}
        />
      </main>
      <aside className={styles.asideR}></aside>
      <footer className={styles.footer}>
        다음글, 관심있어할 내용 등등이 위치할 수 있음
      </footer>
    </div>
  );
};

export default ViewPost;
