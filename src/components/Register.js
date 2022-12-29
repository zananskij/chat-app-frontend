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
          <h3>Register</h3>
          <div className="register-form">
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
              Have an account already? <Link to="/">Login page</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
