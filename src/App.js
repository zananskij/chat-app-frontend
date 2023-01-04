import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import MainPage from './components/MainPage'
import BuddyList from './components/BuddyList'
import Chat from './components/Chat'
import Buddy from './components/BuddyList'

const App = () => {
  const [user, setUser] = useState({ id: null, username: '', password: '' })
  const [error, setError] = useState(null)
  const [allBuddies, setAllBuddies] = useState([])

  // function for registration
  const handleRegister = (event) => {
    axios.post('http://localhost:8000/api/register', user)
  }
  // function for login
  const handleLogin = (event) => {
    axios.post('http://localhost:8000/api/login', user)
  }

  // function for friendslist
  const getAllBuddies = () => {
    axios.post('http://localhost:8000/api/allbuddies', { id: 1 }).then((response) => setAllBuddies(response.data))
  }

  // user1 is hardcoded
  // adds a user to Buddy table
  const handleAddFriend = (id) => {
    axios.post('http://localhost:8000/api/addBuddy', { user1: 1, user2: id }).then((response) => getAllBuddies())
  }

  // delete a single user from Buddy Table.
  const handleDelete = (i) => {
    axios.post('http://localhost:8000/api/delete', { id: i }).then((res) => getAllBuddies())
  }

  useEffect(() => {
    // getUser()
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
