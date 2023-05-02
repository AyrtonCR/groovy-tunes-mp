import style from "../styles/footer.module.css";

import React from "react";

const Footer = () => {
  return (
    <div className={style.footerContainer}>
      <div className={style.footer}>
        <h4 className={style.footerText}>Created by Ayrton Campbell</h4>
      </div>
    </div>
  );
};

export default Footer;
