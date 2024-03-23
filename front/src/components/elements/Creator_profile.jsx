import React from 'react'
import {Link} from 'react-router-dom'
import Tags_row from '../elements/Tags_row';
const Creator_profile = (props) => {
  const data = props.data
  console.log(data)

  return (
	<>
		<div className="main-container">
			<div className="profile-screen">
				<div className="profile-creator-top">
				<div className="profile-title">история просмотра</div>
				<Link to={`/create_course`} className='add_btn'>Add</Link>
				</div>
				

				<div className="profile-card-wrapper">

				
				{data.map(course =>

				<Link to={`/course/${course.id}`} className="main-card">
				<img className="main-card-image" src={course.image}></img>
				<div className="main-card-title">{course.name}</div>
				<div className="main-card-creator">by: <span>{course.created_by}</span></div>
				<Tags_row tags={course.tags}/>
				</Link >
				)
				}
				</div>
			</div>
		</div>

	</>
	
  )
}

export default Creator_profile