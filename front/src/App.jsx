import { useState } from 'react'
import Course_Creation_page from './components/pages/Course_Creation_page';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/pages/Login";
import MainPage from './components/pages/MainPage'
import Logout from './components/elements/Logout';
import Navigate from './components/elements/Navigate'
import Register from './components/pages/Register'
import Course_detail_page from './components/pages/Course_detail_page';
import Video_detail from './components/pages/Video_detail';
import Video_creationPage from './components/pages/Video_creationPage';
import Profile from './components/pages/Profile';
function App() {
 

  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/course/:course_id" element={<Course_detail_page/>}/>
          <Route path="/video/:video_id" element={<Video_detail/>}/>
          <Route path="/create_video/:course_id" element={<Video_creationPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create_course" element={<Course_Creation_page/>}/>
        </Routes>
      </BrowserRouter>
  
  )
}

export default App
