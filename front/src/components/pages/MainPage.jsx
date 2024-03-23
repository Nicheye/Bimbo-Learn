import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Message from '../elements/Message';
import Tags_row from '../elements/Tags_row';
import { Link } from 'react-router-dom';
const MainPage = () => {
	const [data,setData] = useState([]);
	const [message,setMessage] = useState('');
	useEffect(() => {
	  if(localStorage.getItem('access_token') ===null){
		window.location.href = '/login'
  
	  }
	  else{
		(async () =>{
		  try{
			const {data} = await axios.get(
			  'http://127.0.0.1:8000/api/v1/main',{
				headers:{
				  'Content-Type':'application/json'
				},
				withCredentials:true,
			  }
			);
			setData(data.results);
			if (data.message){
				setMessage(data.message)
			}
		  }
		  catch (e){
			console.log('not auth')
		  }
		})()};
	},[]);

	if (message != ''){
		<Message message={message}/>
	}
	else{
		return (
			<div className="main-container">
				<div className="main-screen-wrapper">
				<div className="title">Последние курсы ☕ </div>
				<div className="main-page-cards-wrapper">

				
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
		  )
	}
	
}

export default MainPage