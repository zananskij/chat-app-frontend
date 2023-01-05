import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, useNavigate, useHistory } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import MainPage from './components/MainPage'
import BuddyList from './components/BuddyList'
import Chat from './components/Chat'
import Buddy from './components/BuddyList'
import './App.css'

import { AuthProvider } from './context/AuthContext'

const App = () => {
  const [user, setUser] = useState({ id: null, username: '', password: '' })
  const [error, setError] = useState(null)
  const [allBuddies, setAllBuddies] = useState([])

  const navigate = useNavigate()

  // OLD register
  // const handleRegister = (data) => {
  //   axios.post('http://localhost:8000/api/register', data).then((res) => {
  //     setUser(res.data)
  //   })
  //   navigate('/api/main')
  // }

  // auth register
  const handleRegister = (data) => {
    axios
      .post('http://localhost:8000/api/register', data, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('id_token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
    navigate('/api/main')
  }

  // OLD login
  // const handleLogin = (data) => {
  //   axios.post('http://localhost:8000/api/login', data).then((res) => {
  //     setUser(res.data)
  //   })
  //   navigate('/api/main')
  // }

  // auth login
  // updates Authorization header to the value of YOUR JWT token for the POST request made to the backend
  const handleLogin = (data) => {
    axios
      .post('http://localhost:8000/api/login', data, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('id_token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
    navigate('/api/main')
  }

  // const authenticated = false
  // return (
  //   <Route>{!authenticated ? <Redirect to="/" /> : <Redirect to="/api/main"} </Route>
  // )

  // function for friendslist
  const getAllBuddies = () => {
    axios.post('http://localhost:8000/api/allbuddies', { id: user.id }).then((response) => setAllBuddies(response.data))
  }

  // user1 is hardcoded
  // adds a user to Buddy table
  const handleAddFriend = (id) => {
    axios.post('http://localhost:8000/api/addBuddy', { user1: user.id, user2: id }).then((response) => getAllBuddies())
  }

  // delete a single user from Buddy Table.
  const handleDelete = (i) => {
    axios.post('http://localhost:8000/api/delete', { my_id: user.id, id: i }).then((res) => getAllBuddies())
  }

  useEffect(() => {
    // getUser()
    console.log(user)
  }, [user])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="api/register" element={<Register handleRegister={handleRegister} />} />
        <Route
          path="api/main"
          element={
            <MainPage
              handleAddFriend={handleAddFriend}
              getAllBuddies={getAllBuddies}
              allBuddies={allBuddies}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="api/chat/:targetid"
          element={
            <Chat allBuddies={allBuddies} handleDelete={handleDelete} getAllBuddies={getAllBuddies} user={user} />
          }
        />
      </Routes>
    </>
  )
}

export default App
