import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Route, Routes, Link, useNavigate, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  let { loginUser } = useContext(AuthContext)

  return (
    <div className="login-page">
      <div className="login-container">
        <h3>Login</h3>
        <div className="login-form">
          {/* <form onSubmit={() => props.handleLogin(user)}> */}
          <form onSubmit={loginUser}>
            <input
              type="text"
              name="username"
              value={user.username}
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <box-icon name="user" color="white"></box-icon>
            <br />
            <br />
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              required
              onChange={handleChange}
            />

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
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login
