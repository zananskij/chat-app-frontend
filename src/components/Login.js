import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' })

  const navigate = useNavigate()

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleLogin(user)
    // route to the homepage
    // navigate('/homepage')
  }

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h3>Sign in below to start chatting!</h3>
          <p>
            Don't have an account? <Link to="api/register">Register page</Link>
          </p>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" required value={user.username} onChange={handleChange} />
              <br />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" required value={user.password} onChange={handleChange} />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
