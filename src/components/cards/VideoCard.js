import React, { useContext, useState } from "react";
import { GlobalContext } from "../../providers/globalProvider";

function VideoCard({video, title, description, handleVideoClick}) {


  const {print} = useContext(GlobalContext)
  const onClick = (event) =>{
    handleVideoClick(video)
    event.preventDefault()
    print()
  }
  
  
  return (
    <div>
      <div className="video-card">
        <div className="video-main">
          <a href="#" className="video-link" onClick={onClick} >
            <img src={require('../../assets/images/Vector.png')} alt="Video Thumbnail" />
          </a>
        </div>
        <div className="video-content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;