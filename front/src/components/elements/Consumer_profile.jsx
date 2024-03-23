import React from 'react'
import { Link } from 'react-router-dom';
const Consumer_profile = (props) => {
  const data = props.data
  console.log(data)

  return (
	<>
		<div className="main-container">
			<div className="profile-screen">
				
				<div className="profile-title">история просмотра</div>

				<div className="profile-card-wrapper">

				
				{data.map(course =>

				<Link to={`/video/${course.video.id}`} className="main-card">
				<img className="main-card-image" src={course.video.thumbnail}></img>
				<div className="main-card-title">{course.video.title}</div>
				
				
				</Link >
				)
				}
				</div>
			</div>
		</div>

	</>
	
  )
}

export default Consumer_profile