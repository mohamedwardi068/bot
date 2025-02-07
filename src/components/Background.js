import React from "react";
import "../background.css"
import video from "../assets/bg-universe.mp4"
import fallbackImg from "../assets/fallback-image.png"
const Background=()=>{
    return(<>
    <div className="shadow-overlay">
        <video playsInline autoPlay loop muted preload="auto" id="bg" poster={fallbackImg}><source src={video} type="video/mp4"></source></video>
    </div>
  
    </>)
}
export default Background;