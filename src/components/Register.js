import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

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

  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <h3>Register</h3>
          <div className="register-form">
            <form onSubmit={handleRegister}>
              <input type="text" value={username} placeholder="Username" required onChange={handleUsernameChange} />
              <box-icon name="user" color="white"></box-icon>
              <br />
              <br />
              <input type="password" value={password} placeholder="Password" required onChange={handlePasswordChange} />
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
