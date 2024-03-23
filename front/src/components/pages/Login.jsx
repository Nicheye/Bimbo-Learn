import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// Define the Login function.
const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
// Create the submit method.
  const submit = async e =>{
    e.preventDefault()

    const user = {
      username:username,
      password:password
    };
// Create the POST requuest
const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

const { data } = await axios.post('http://localhost:8000/token/', user, config);
  localStorage.clear();
  console.log(data.access)
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  window.location.href = '/'
  }

  return (
    <>
    <div className="main-container">
      <form action="" className="login-form" onSubmit={submit}>

        <div className="auth-title">Login</div>

        <div className="auth-group">
          <div className="auth_label">username</div>
          <input className="auth_input" 
            
            name='username'  
            type='text' value={username}
            required 
            onChange={e => setUsername(e.target.value)}/>
        </div>

        <div className="auth-group">
          <div className="auth_label">password</div>
          <input name='password' 
            type="password"     
            className="auth_input"
           
            value={password}
            required
            onChange={e => setPassword(e.target.value)}/>
        </div>

        <button type='submit' className="auth_btn">login</button>

        <Link className="auth_hint" to={'/register'}>No account? register</Link>
      </form>
    </div>
    </>
  )
}

export default Login

