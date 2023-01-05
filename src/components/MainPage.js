import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BuddyList from './BuddyList'

const MainPage = (props) => {
  const [allUsers, setAllUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    const filteredUsers = allUsers.filter((user) => user.username.includes(searchTerm))
    setFilteredUsers(filteredUsers)
  }
  const handleGetAllUsers = () => {
    axios.get('http://localhost:8000/api/allUsers').then((response) => {
      setAllUsers(response.data)
      console.log(response)
      const displayFiltered = response.data.filter((user) => user.username.includes(searchTerm))
      setFilteredUsers(displayFiltered)
    })
  }

  //   displays list of users or filtered users depending if there is anything in search input
  const userToDisplay = searchTerm ? filteredUsers : []
  //   const userToDisplay = searchTerm ? filteredUsers : allUsers

  //   const onSearchChange = useCallback(
  //     (event) => {
  //       // what is being input in the search bar
  //       const searchInput = event.target.value
  //       //    updates the searchTerm state array with the value of the input
  //       setSearchTerm(searchInput)
  //       // sets the input to all lowerCase
  //       const searchInputLower = searchInput.toLowerCase()
  //       //   if anything is input it will be set to a result array that will be used to update the filteredUsers array
  //       if (searchInput.length > 0) {
  //         const result = allUsers.filter((user) => {
  //           return user.username.toLowerCase().includes(searchInputLower)
  //         })
  //         setFilteredUsers(result)
  //       } else {
  //         setFilteredUsers([])
  //       }
  //     },
  //     [allUsers]
  //   )

  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState('')

  const handleSignout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      setLoggedIn(false)
      navigate('/')
    }
  }

  const checkIfBud = (id) => {
    for (let obj of props.allBuddies) {
      if (obj.id == id) return true
    }

    return false
  }

  //   fetches all users + buddies when MainPage is loaded
  useEffect(() => {
    handleGetAllUsers()
    props.getAllBuddies()
  }, [])

  return (
    <div className="homepage">
      <nav className="navbar navbar-light bg-dark">
        <input
          type="text"
          placeholder="Search for Users"
          // defaultValue={searchTerm}
          // onChange={onSearchChange}
          className="form-inline"
          onKeyUp={handleSearch}
        />
        <button onClick={handleSignout} className="signOut btn btn-danger ">
          Sign Out
        </button>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
          <h2>My Friends</h2>
            {props.allBuddies.length < 1 ? <h2>Please Add Buddy</h2> : props.allBuddies.map((obj) => (
              <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser} />
            ))}
          </div>
          <div className="col-sm-8">
            <ul className="list-group">
                <h2>Online Users</h2>
                <hr />
              {userToDisplay.map((user) => (
                <li key={user.id} className="list-group-item">
                  {user.username}
                </li>
                
              ))}
            </ul>

            <main>
              {filteredUsers.map((user) => {
                // {userToDisplay.map((user) => {
                return (
                  <>
                    <div key={user.id} className="d-flex mx-2">
                      <h2 >{user.username}</h2>

                      {checkIfBud(user.id) ? null : (
                        <button onClick={() => {
                            console.log(user.id)
                            props.handleAddFriend(user.id)
                        }} className="btn btn-primary mx-3">
                          Add
                        </button>
                      )}
                    </div>
                    <hr />
                  </>
                )
              })}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
