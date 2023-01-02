import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
    <div className="login-page">
      <div className="login-container">
        <h3>Login</h3>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input type="text" value={username} placeholder="Username" required onChange={handleUsernameChange} />
            <box-icon name="user" color="white"></box-icon>
            <br />
            <br />
            <input type="password" value={password} placeholder="Password" required onChange={handlePasswordChange} />
            <box-icon name="lock-alt" color="white"></box-icon>
            <br />
            <div className="options-container">
              <button type="submit" className="login-btn">
                Login
              </button>
              <span>
                Don't have an account? <Link to="api/register">Sign up!</Link>
              </span>
            </div>

            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
