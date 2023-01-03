import useState from 'react'
import { useNavigate } from 'react-router-dom'

const Buddy = (props) => {
    let navigate = useNavigate()

    
    const handleChange = () => {
        props.changeTargetUser(props.user.id)
        navigate('api/chat')
    }


    return (
        <li>
            <button onClick={handleChange}>{props.user.username}</button>
            <button onClick={() => {
                props.handleDelete(props.user.id)
                console.log(props.user)
            }}>Delete</button>
        </li>
    )
}

export default Buddy