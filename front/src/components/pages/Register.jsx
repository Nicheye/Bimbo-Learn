import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// Define the Login function.
const Register = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [status,setStatus] = useState(1);
// Create the submit method.
  const submit = async e =>{
    e.preventDefault()

    const user = {
      username:username,
      password:password,
      email:email,
      status:status,

    };
// Create the POST requuest
const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

const { data } = await axios.post('http://127.0.0.1:8000/api/v1/register/', user, config);
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

        <div className="auth-group">
          <div className="auth_label">email</div>
          <input name='email' 
            type="email"     
            className="auth_input"
           
            value={email}
            required
            onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className="auth-group">
          <div className="auth_label">status</div>
    
          
          <select name="email" className="auth_input"  value={status} required onChange={e => setStatus(e.target.value)}  id="">
            <option value="consumer">consumer</option>
            <option value="creator">creator</option>
          </select>
        </div>

        <button type='submit' className="auth_btn">Register</button>


        <Link className="auth_hint" to={'/login'}>have account? login</Link>
      </form>
    </div>
    </>
  )
}

export default Register