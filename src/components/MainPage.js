import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import BuddyList from './BuddyList'


const MainPage = (props) => {
    const [allUsers, setAllUsers] = useState([])
    

    // function to get every single object from user table
    const handleGetAllUsers = () => {
        axios.get('http://localhost:8000/api/allUsers').then(response => {
            setAllUsers(response.data)
            console.log(response)
        })
    }


    const checkIfBud = (id) => {
        for(let obj of props.allBuddies){
            if (obj.id == id) return true
        }

        return false
    }


    useEffect(() => {
        handleGetAllUsers()
        props.getAllBuddies()
    }, [])

    return(
        // flex column this
        <div>
            <div>
                {/* spawns the buddy list */}
            {props.allBuddies.map(obj => <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser}/>)}
            </div>

            <div>
                {/* search bar */}
                <input type="text" />

                {/* main content / all Users*/}
                <main>
                    {allUsers.map(user => {
                        return (
                            <>
                                <li>
                                    <h2>{user.username}</h2>
                                    
                                    {/* checkIfBud function literally checks if the User we are looking at is inside the BUddy Table. If it is, it will return true making this condition true. */}
                                    {checkIfBud(user.id) ? null : <button onClick={() => props.handleAddFriend(user.id)}>Add</button>}
                                </li>
                            </>
                        )
                    })}
                </main>
            </div>


        </div>
    )
}


export default MainPage