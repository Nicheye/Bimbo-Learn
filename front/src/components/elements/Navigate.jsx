import React, { useState, useEffect} from 'react';

import {Link} from 'react-router-dom'
import logo from '/coursera/Bimbo-Learn/front/src/assets/logo.png'
const Navigate = () => {
	const [isAuth,setIsAuth] = useState(false)

  const [search,setSearch] = useState('');
	useEffect(() => {
		if(localStorage.getItem('access_token') !== null){
			setIsAuth(true);
		}
	},[isAuth]);
  const handleSearchSubmit = () => {
    // Implement your search functionality here, such as making an API request to your backend
    console.log('Performing search for:', searchQuery);
    // You can make API requests here using fetch or any other method
  };
  return (

  <>
  <div className="container">

  <header className="header">
    <Link to={'/'} className="header-logo"><img src={logo} alt="" /></Link>

      <div className="searche-field"  >
        <form action="" onSubmit={handleSearchSubmit}>
          <input type="text" className="search" placeholder='Search...' required value={search} onChange={e => setSearch(e.target.value)} />

         
        </form>
       
         
         
         
      </div>
    
      {isAuth ? <Link to="/profile" className='log_profile_link'>Profile</Link> :
                  
                  
      <Link to="/login" className='log_profile_link'>Login</Link>}
  </header>

  </div>
   
  </>       
  )
}


export default Navigate