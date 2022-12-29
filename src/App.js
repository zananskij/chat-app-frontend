import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
// import Homepage from './components/Homepage'

const App = () => {
  const [user, setUser] = useState({ username: '', password: '' })

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

  useEffect(
    () => {
      getUser()
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
      </Routes>
    </>
  )
}

export default App
