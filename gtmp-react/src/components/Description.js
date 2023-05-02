import style from "../styles/description.module.css";

import React from "react";

const Description = () => {
  return (
    <div className={style.descriptionContainer}>
      <div className={style.description}>
        <p className={style.descriptionText}>
          This is a music player I built to get a better understanding of how I can implement a feature like this in future applications. I followed the first
          part of a <a href="https://www.youtube.com/watch?v=sqpg1qzJCGQ"> video</a> on youtube with some minor variations. I chose not to use next.js{" "}
        </p>
      </div>
    </div>
  );
};

export default Description;
