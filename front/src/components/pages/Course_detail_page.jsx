import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Message from '../elements/Message';
import Videos_list from '../elements/Videos_list';
import Playlist_popup from '../elements/Playlist_popup';
import add from '/coursera/Bimbo-Learn/front/src/assets/add_icon.svg'
import { Link } from 'react-router-dom';
const Course_detail_page = () => {
  const { course_id } = useParams();

  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/course/${course_id}`,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          }
        );
        setData(data.data);
        setUser(data.user)
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
  }, [course_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message !== '') {
    return <Message message={message} />;
  }

  return (
    <div className="main-container">
	  <Playlist_popup course_id={course_id}/>
      <div className="course-screen">
        <div className="course-top" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),url(${data.image})` }}>
          <div className="course-title">{data.name}</div>
		  <img className="course-add_pl" type="button" src={add} data-bs-toggle="modal" data-bs-target="#playlistpopup" ></img>
        </div>
        <div className="course-bottom">
          <Videos_list videos={data.videos} />
          {data.created_by === user ? (
          <Link to={`/create_video/${course_id}`} className='add_btn'>Add</Link>
        ) : null}

        </div>

      </div>
    </div>
  );
};

export default Course_detail_page;
