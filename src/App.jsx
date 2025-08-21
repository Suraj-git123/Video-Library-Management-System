import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import VideoLibraryIndex from './components/video-library-index';
import AdminLogin from './components/admin-login';
import AdminDashboard from './components/admin-dashboard';
import AddVideo from './components/add-video';
import DeleteVideo from './components/delete-video';
import EditVideo from './components/edit-video';
import UserLogin from './components/user-login';
import UserRegister from './components/user-register';
import UserDashboard from './components/user-dashboard';
import Navbar from './components/navbar';
import PlayVideo from './components/video-play';
import UserProfile from './components/user-profile';

function App() {

  return (
    <div className='container-fluid'>
        <BrowserRouter>
            
            <section>
              <Routes>
                <Route path='/' element={<VideoLibraryIndex />}></Route>
                <Route path='admin-login' element={<AdminLogin />}></Route>
                <Route path='admin-dash' element={<AdminDashboard />}></Route>
                <Route path='add-video' element={<AddVideo />}></Route>
                <Route path='delete-video/:id' element={<DeleteVideo />}></Route>
                <Route path='edit-video/:id' element={<EditVideo />}></Route>
                <Route path='user-login' element={<UserLogin />}></Route>
                <Route path='user-register' element={<UserRegister />}></Route>
                <Route path='user-dash' element={<UserDashboard />}></Route>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/play-video/:id" element={<PlayVideo />} />
                <Route path='/user-profile/:id' element={<UserProfile />} />
              </Routes>

            </section>
        </BrowserRouter>
    </div>
  )
}

export default App
