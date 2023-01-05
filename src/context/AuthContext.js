import { createContext, useState, useEffect } from 'react'
// import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(null)
  let [user, setUser] = useState(null)

  let loginUser = async (e) => {
    e.preventDefault()
    console.log('form submitted')
    // let response = fetch('http://localhost:8000/api/token/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: null, password: null }),
    // })
  }

  let contextData = {
    loginUser: loginUser,
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
