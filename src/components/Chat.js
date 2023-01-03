import BuddyList from './BuddyList'
import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'


const Chat = (props) => {
    let { targetid } = useParams()
    const [msg, setMsg] = useState([])

    const getMessages = () => {
        axios.post('http://localhost:8000/api/allmessages', {my_id: props.user.id, other_id: targetid})
        .then(res => setMsg(res.data))
    }

    useEffect(() => {
        props.getAllBuddies()
        getMessages()
    }, [])


    const msgArray = msg.map(obj => <li>obj.message</li>)
    
    return (
        <main>
            <div>
                {/* spawns the buddy list */}
                {props.allBuddies.map(obj => <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser}/>)}
            </div>

            <div>
                <div>
                    {msgArray}
                </div>
                
                
                <div>
                    <input type="text" />
                    <input type="submit" value='Enter' />
                </div>
            </div>

        </main>
    )
}


export default Chat