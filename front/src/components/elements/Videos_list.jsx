import React from 'react'
import { Link } from 'react-router-dom'
import play from '/coursera/Bimbo-Learn/front/src/assets/play_btn.png'
const Videos_list = (props) => {
  const videos = props.videos
  return (
	<>
	{videos.map(video =>
		<div className="video-item-wrapper">
			<img className="video-item-image" src={video.thumbnail}/>
			<div className="video-item-title">{video.title}</div>
			<Link to={`/video/${video.id}`} className='play_btn'><img src={play} alt="" /></Link>
		</div>
		)}
	</>
  )
}

export default Videos_list