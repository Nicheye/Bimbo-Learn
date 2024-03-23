import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tag_adder from '../elements/Tag_adder';
const Course_Creation_page = () => {
  const navigate = useNavigate()	
  const [title,setTitle] = useState()
  const [thumbnail,setThumbnail] = useState([]);
  const uploadthumb = (e) => {
    setThumbnail({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const submit = async e =>{
    e.preventDefault()
    const new_course = {
      name:title,
	  image:thumbnail.pictureAsFile
    };

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    };
    const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/course/`, new_course, config);
    <Tag_adder/> 
  }
  return (
	<>
	<div className="main-container">
		<form action="" className="course-creaton-form" onSubmit={submit}>
		<div className="input-video-group">
          <div className="input-video-title ">title</div>
          <input type="text" value={title} required onChange={e => setTitle(e.target.value)} className="input-video-input course" />
        </div>

		<div className="input-video-group video course">
          
          <input type="file" required onChange={uploadthumb}  id="thumb-input" className="input-video-thumb" />
          <label for="thumb-input" style={{backgroundImage:`url(${thumbnail.picturePreview})`}} >Upload thumnail</label>
        </div>
		<button type='submit' className='creation-btn course'>Add</button>
		</form>
	</div>
	</>
  )
}

export default Course_Creation_page