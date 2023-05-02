import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { v4 as uuidv4 } from "uuid";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import Song1 from "./Song.mp3";
import Song2 from "./Song2.mp3";

const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  // references
  const audioPlayer = useRef(); //reference our audio component
  // const audioRef = useRef(); //reference our audio component
  const progressBar = useRef(); //reference our progress bar
  const animationRef = useRef(); //reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    console.log(audioPlayer);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`);
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };

  function handlePreviousTrack() {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    if (isPlaying) {
      audioPlayer.current.play();
    }
  }

  function handleNextTrack() {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    if (isPlaying) {
      audioPlayer.current.play();
    }
  }

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  // Track from AI

  const songs = [
    {
      id: uuidv4(),
      artist: "Artist 1",
      title: "Song 1",
      src: Song1,
    },
    {
      id: uuidv4(),
      artist: "Artist 2",
      title: "Song 2",
      src: Song2,
    },
  ];

  return (
    <>
      <div className={styles.audioPlayerContainer}>
        <div className={styles.playerDetails}>
          <h3 className={styles.playerDetailsTitle}>{songs[currentSongIndex].title}</h3>
          <h4 className={styles.playerDetailsArtist}>{songs[currentSongIndex].artist}</h4>
        </div>

        <div className={styles.audioPlayer}>
          <audio ref={audioPlayer} src={songs[currentSongIndex].src} preload="metadata" onLoadedMetadata={onLoadedMetadata} />
          <button className={styles.prevTrack} onClick={handlePreviousTrack}>
            <FaBackward />
          </button>
          <button onClick={backThirty} className={styles.forwardBackward}>
            <BsArrowLeftShort /> 30
          </button>
          <button className={styles.playPause} onClick={togglePlayPause}>
            {isPlaying ? <FaPause className={styles.pause} /> : <FaPlay className={styles.play} />}
          </button>
          <button onClick={forwardThirty} className={styles.forwardBackward}>
            <BsArrowRightShort /> 30
          </button>
          <button className={styles.nextTrack} onClick={handleNextTrack}>
            <FaForward />
          </button>
          {/* Current time */}

          {/* Progress Bar */}

          {/* duration */}
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
          <input ref={progressBar} type="range" className={styles.progressBar} defaultValue="0" onChange={changeRange} />
          <div className={styles.duration}>{duration && !isNaN(duration) && calculateTime(duration)}</div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
