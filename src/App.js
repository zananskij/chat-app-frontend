import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        username: username,
        password: password,
      })
      console.log(response.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: username,
        password: password,
      })
      if (response.data.hasOwnProperty('id')) {
        console.log(`Welcome, ${response.data.username}!`)
      } else {
        setError(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h1>Chat App</h1>
      <h2>Initial temporary login page </h2>

      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="api/register" element={<Register handleRegister={handleRegister} />} />
      </Routes>
    </>
  )
}

export default App
