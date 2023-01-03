import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Search from './components/Search'
import MainPage from './components/MainPage'
import BuddyList from './components/BuddyList'
import Chat from './components/Chat'

const App = () => {
  const [user, setUser] = useState({ id: null, username: '', password: '' })
  const [error, setError] = useState(null)
  const [allBuddies, setAllBuddies] = useState([])

  const [isSearching, setIsSearching] = useState(false)
  const [filteredUser, setFilteredUser] = useState([])

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/register', user)
      if (response.data.hasOwnProperty('id')) {
        console.log(`Welcome, ${response.data.username}!`)
      } else {
        setError(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/login', user)
      if (response.data.hasOwnProperty('id')) {
        console.log(`Welcome, ${response.data.username}!`)
      } else {
        setError(response.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const getAllBuddies = () => {
    axios.post('http://localhost:8000/api/allbuddies', { id: 1 }).then((response) => setAllBuddies(response.data))
  }

  // user1 is hardcoded
  // adds a user to Buddy table
  const handleAddFriend = (id) => {
    axios.post('http://localhost:8000/api/addBuddy', { user1: 1, user2: id }).then((response) => getAllBuddies())
  }

  // delete a single user from Buddy Table.
  const handleDelete = (i) => {
    axios.post('http://localhost:8000/api/delete', { id: i }).then((res) => getAllBuddies())
  }

  useEffect(
    () => {
      // getUser()
    },
    // []
    [user]
  )

  // search function
  const onSearchChange = useCallback(
    (searchInput) => {
      const searchInputLower = searchInput.toLowerCase()
      if (searchInput.length > 0) {
        setIsSearching(true)
        const result = user.filter((username) => {
          return username.toLowerCase().match(searchInputLower)
        })
        setFilteredUser(result)
      } else {
        setIsSearching(false)
      }
    },
    [user]
  )
  // const userToDisplay = isSearching ? filteredUser : user

  return (
    <>
      <div>
        <nav className="nav bar navbar-expand w-100 d-flex p-3;">
          <Search onSearchChange={onSearchChange} />
        </nav>
        <div className="row user-displayed">
          {/* {userToDisplay.map((username) => {
            return (
              <div>
                <p>{username}</p>
              </div>
            )
          })} */}
        </div>
      </div>

      <h1>Chat App</h1>
      <h2>Initial temporary login page </h2>

      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="api/register" element={<Register handleRegister={handleRegister} />} />
        <Route
          path="/allUsers"
          element={
            <MainPage
              handleAddFriend={handleAddFriend}
              getAllBuddies={getAllBuddies}
              allBuddies={allBuddies}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="api/chat/:id"
          element={<Chat allBuddies={allBuddies} handleDelete={handleDelete} getAllBuddies={getAllBuddies} />}
        />
      </Routes>
    </>
  )
}

export default App
