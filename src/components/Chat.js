import BuddyList from './BuddyList'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Message from './Message'

const Chat = (props) => {
  let { targetid } = useParams()
  const [msg, setMsg] = useState([])
  const [singleMsg, setSingleMsg] = useState({ message: '' })

  const handleChange = (event) => {
    console.log(singleMsg)
    setSingleMsg({ ...singleMsg, [event.target.name]: event.target.value })
  }

  const getMessages = () => {
    axios
      .post('http://localhost:8000/api/allmessages', { my_id: props.user.id, other_id: Number(targetid) })
      .then((res) => setMsg(res.data))
  }

  const addMessage = () => {
    axios
      .post('http://localhost:8000/api/sendmessage', { user1: props.user.id, user2: Number(targetid), message: singleMsg.message })
      .then((res) => {
        getMessages()
        setSingleMsg({ message: '' })
      })
  }

  useEffect(() => {
    props.getAllBuddies()
    getMessages()
  }, [targetid])

  const msgArray = msg.map((obj) => <Message obj={obj}/>)

  return (
    <main className='container-fluid mt-4'>
        <div className='row'>
            <div className='col-2'>
                {/* spawns the buddy list */}
                {props.allBuddies.map((obj) => (
                <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser} />
                ))}
             </div>

            <div className='col-10'>
                <div className="d-flex flex-column w-100">{msgArray}</div>

                <form className='d-flex justify-content-center w-100 mx-auto'
                onSubmit={(event) => {
                    event.preventDefault()
                    addMessage()
                }}
                >
                <div className='w-100'>
                    <input className='w-100' type="text" name="message" onChange={handleChange} value={singleMsg.message} />
                    <input className='w-100' type="submit" value="Enter" />
                </div>
                </form>
            </div>
        </div>
      
    </main>
  )
}

export default Chat
