import { useRef, useEffect } from "react";
import video from "../../assets/Video.mp4";
import style from "./Video.module.css";

function VideoBackground() {
  const videoRef: any = useRef(null);

  useEffect(() => {
    videoRef.current.play();
  }, []);

  return (
    <div className={style.videoBackground}>
      <video ref={videoRef} autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
    </div>
  );
}

export default VideoBackground;
