import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = (props) => {
  const [user, setUser] = useState({ username: '', password: '' })

  let navigate = useNavigate()

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleLogin(user)
    // route to
    // navigate('/login')
  }

  // async function handleSubmit(event) {
  //   event.preventDefault()
  //   await submitForm(event.target)
  //   navigate('api/login')
  // }
  // return
  //   <form onSubmit={handleSubmit}>

  //   // </form>

  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <h3>Register below to start chatting!</h3>
          <p>
            Have an account already? <Link to="/">Login page</Link>
          </p>
          <div className="register-form">
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

export default Register
