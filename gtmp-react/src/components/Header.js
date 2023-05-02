import style from "../styles/header.module.css";

import React from "react";

const Header = () => {
  return (
    <div className={style.headerContainer}>
      <div className={style.header}>
        <h1 className={style.headerTitle}>Groovy Tunes Music Player</h1>
        <h5 className={style.headerSubtitle}>
          A simple music player built with React.
        </h5>
      </div>
    </div>
  );
};

export default Header;
