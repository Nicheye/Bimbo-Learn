import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Message from './Message'
import { useNavigate } from 'react-router-dom'
const Playlist_popup = (props) => {
const [data, setData] = useState({});
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [req,setReq] = useState('')
const [r_id,setR_id] = useState('')
const navigate = useNavigate();
const course_id = props.course_id
const video_id = props.video_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v1/playlist`,
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message !== '') {
    return <Message message={message} />;
  }
  const sumbit = async (id) => {
	if (typeof course_id !== 'undefined') {
	  setReq('course');
	  setR_id(course_id);
	} else {
	  setReq('video');
	  setR_id(video_id);
	}
  
	const config = {
	  headers: {
		'Content-Type': 'application/json'
	  },
	  withCredentials: true
	};
  
	try {
	  const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/playlist/${id}/${req}/${r_id}`, config);
	  // handle response data if needed
	} catch (error) {
	  console.error('Error submitting:', error);
	  // handle error if needed
	}
  };
  console.log(video_id)
  return (
	<>
	
	<div class="modal fade" id="playlistpopup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-body">
		<div className="modal_title">Choose your playlist</div>
		<div className="playlist-list">
			{data.map(playlist =>
				<div className="playlist" onClick={() => sumbit(playlist.id)}>
        <div className="playlist_name">{playlist.name}</div>
        {playlist.videos[0]?.video.title ? (
          <div>{playlist.videos[0].video.title}</div>
        ) : (
          <div style={{color:"red"}}>nothing added</div>
        )}
      </div>
       )}
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Playlist_popup