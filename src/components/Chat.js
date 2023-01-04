import BuddyList from './BuddyList'
import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

const Chat = (props) => {
    let { targetid } = useParams()
    const [msg, setMsg] = useState([])
    const [singleMsg, setSingleMsg] = useState({message: ''})

    const handleChange = (event) => {
        setSingleMsg({ ...singleMsg, [event.target.name]: event.target.value })
      }

    const getMessages = () => {
        axios.post('http://localhost:8000/api/sendmessage', {my_id: 1, other_id: Number(targetid)})
        .then(res => setMsg(res.data))
    }

    const addMessage = () => {
        axios.post('http://localhost:8000/api/allmessages', {my_id: 1, other_id: Number(targetid), message: })
        .then(res => setMsg(res.data))
    }

    useEffect(() => {
        props.getAllBuddies()
        getMessages()
    }, [targetid])

    const msgArray = msg.map(obj => {
        if(obj.sender === Number(targetid)){
            return <li className='align-self-start'>{obj.message}</li>
        } else {
            return <li className='align-self-end'>{obj.message}</li>
        }
    })

    return (
        <main>
            <div>
                {/* spawns the buddy list */}
                {props.allBuddies.map(obj => <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser}/>)}
            </div>

            <div>
                <div className='d-flex flex-column'>
                    {msgArray}
                </div>

                <form action="">
                    <input type="text" />
                    <input type="submit" value='Enter' />
                </form>

            </div>

        </main>
    )
}

export default Chat
