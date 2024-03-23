import React from 'react'
import Message from './Message';
const Tag_adder = () => {
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

  return (
	<div>Tag_adder</div>
  )
}

export default Tag_adder