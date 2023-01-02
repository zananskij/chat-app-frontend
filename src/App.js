import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
// import Homepage from './components/Homepage'
import MainPage from './components/MainPage'

const App = () => {
  const [user, setUser] = useState({ id: null, username: '', password: '' })
  const [allBuddies, setAllBuddies] = useState([])
  const getUser = () => {
    axios
      .get('http://localhost:8000/api/')
      .then(
        (response) => setUser(response.data),
        (err) => console.log(err)
      )
      .catch((error) => console.log(error))
  }

  // create user function
  const handleRegister = (data) => {
    axios.post('http://localhost:8000/api/register/', data).then((response) => setUser(response.data))
  }

  // user login function XX not needed
  const handleLogin = (data) => {
    axios.post('http://localhost:8000/api/login', data).then((response) => setUser(response.data))
  }

  // id is hardcoded
  // function to get all objects from buddy table
  const getAllBuddies = () => {
    axios.post('http://localhost:8000/api/allbuddies', {id: 1}).then(response => setAllBuddies(response.data))
}
  
  // user1 is hardcoded
  // adds a user to Buddy table
  const handleAddFriend = (id) => {
    axios.post('http://localhost:8000/api/addBuddy', {user1: 1, user2: id}).then((response) => getAllBuddies())
  }

  // delete a single user from Buddy Table.
  const handleDelete = (i) => {

    axios.post('http://localhost:8000/api/delete', {id: i})
    .then(res => getAllBuddies())
  }
  

  useEffect(
    () => {
      // getUser()
    },
    // []
    [user]
  )

  return (
    <>
      <h1>Chat App</h1>
      <h2>Initial temporary login page </h2>
    
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="api/register" element={<Register handleRegister={handleRegister} />} />
        {/* <Route path="/homepage" element={<Homepage handleHomepage={handleHomepage} />} /> */}
        <Route path='api/main' element={<MainPage handleAddFriend={handleAddFriend} getAllBuddies={getAllBuddies} allBuddies={allBuddies} handleDelete={handleDelete}/>} />
      </Routes>
    </>
  )
}

export default App
