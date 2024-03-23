import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Message from '../elements/Message';
import axios from 'axios';
import Playlist_popup from '../elements/Playlist_popup';
import add from '/coursera/Bimbo-Learn/front/src/assets/add_icon.svg'
const Video_detail = () => {
  const { video_id } = useParams();
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/video/${video_id}`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          }
        );
        setData(data.data);
        if (data.message) {
          setMessage(data.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('not auth');
      }
    };

    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    } else {
      fetchData();
    }
  }, [video_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message !== '') {
    return <Message message={message} />;
  }

  return (
    <div className="main-container">
      <Playlist_popup video_id={video_id}/>
      <div className="video-screen-wrapper">
		<div className="video-top">
			<img src={data.thumbnail} alt="" className="video-top-image" />
      <img className="course-add_pl" type="button" src={add} data-bs-toggle="modal" data-bs-target="#playlistpopup" ></img>
			<div className="video-top-title">{data.title}</div>
		</div>
		<div className="video-bottom">
		{data.video !== null && (
            <video controls className='video_video'>
              <source src={data.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

		{data.url_video !== null && (
            <iframe
			className='video_video'
			
			src={`https://www.youtube.com/embed/${data.url_video}`}
			
			allowFullScreen
			title='YouTube Video'
		  />
          )}
		</div>

		<div className="video-description">{data.description}</div>
	  </div>
    </div>
  );
}

export default Video_detail