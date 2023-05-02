import Header from "../components/Header";
import Description from "../components/Description";
import AudioPlayer from "../components/AudioPlayer";
import Footer from "../components/Footer";
import style from "../styles/home.module.css";
import React from "react";
import Img from "../images/img2.jpeg";

const home = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.backgroundImage}>
        <img className={style.image} src={Img} alt="fuck you"></img>
      </div>
      <Header />

      <AudioPlayer />
      <Description />
      <Footer />
    </div>
  );
};

export default home;
