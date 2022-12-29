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
          <h3>Login</h3>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={user.username}
                onChange={handleChange}
              />
              <box-icon name="user" color="white"></box-icon>
              <br />
              <br />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={user.password}
                onChange={handleChange}
              />
              <box-icon name="lock-alt" color="white"></box-icon>
              <br />
              <input type="submit" className="submit" />
            </form>
            <span>
              Don't have an account? <Link to="api/register">Sign up!</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
