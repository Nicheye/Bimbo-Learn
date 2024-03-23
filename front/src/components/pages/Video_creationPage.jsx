import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Message from '../elements/Message';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Video_creationPage = () => {
  const { course_id } = useParams();
  const [title,setTitle] = useState('');
  const [url_video,setUrlVideo] = useState('');
  const [video,setVideo] = useState([]);
  const [thumbnail,setThumbnail] = useState([]);
  const navigate = useNavigate()
  const [description,setDesciption] = useState('');
  const submit = async e =>{
    e.preventDefault()
    const new_video = {
      title:title,
      url_video:url_video,
      video:video.pictureAsFile,
      thumbnail:thumbnail.pictureAsFile,
      description:description
    };
    console.log(thumbnail.pictureAsFile)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    };
    const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/course/${course_id}`, new_video, config);
    navigate(-1)
  }
  const uploadVideo = (e) => {
    setVideo({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const uploadThumbnail = (e) => {
    setThumbnail({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };
  return (
	<>
  <div className="main-container" >
    <div className="add-video-screen">
      <form action="" className="add_video_form" onSubmit={submit}>
        <div className="input-video-group">
          <div className="input-video-title">title</div>
          <input type="text" value={title} required onChange={e => setTitle(e.target.value)} className="input-video-input" />
        </div>

        <div className="input-video-group video">
          
          <input type="file" required onChange={uploadThumbnail} id="thumb-input" className="input-video-thumb" />
          <label for="thumb-input">Upload thumnail</label>
        </div>


        <div className="input-video-group video">
          
          <input type="file" onChange={uploadVideo} id="video-input"  className="input-video-file" />
          <label for="video-input">Upload video</label>
        </div>

        

        <div className="input-video-group">
          <div className="input-video-title">url</div>
          <input type="text" value={url_video} onChange={e => setUrlVideo(e.target.value)} className="input-video-input" />
        </div>

        <div className="input-video-group">
          <div className="input-video-title">description</div>
          <textarea type="text" value={description} required onChange={e => setDesciption(e.target.value)} className="input-video-input-tr" />
        </div>

        <button type='submit' className='creation-btn'>Add</button>
      </form>
    </div>
  </div>
  </>
  )
}

export default Video_creationPage