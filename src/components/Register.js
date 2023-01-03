import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = (props) => {
  const [user, setUser] = useState({ id: null, username: '', password: '' })
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/register', user)
      if (response.data.hasOwnProperty('id')) {
        console.log(`Welcome, ${response.data.username}!`)
        navigate('/')
      } else {
        setError(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <h3>Register</h3>
          <div className="register-form">
            <form onSubmit={handleRegister}>
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
                <button type="submit" className="register-btn">
                  Register
                </button>
                <span>
                  Have an account already? <Link to="/">Login page</Link>
                </span>
              </div>

              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
