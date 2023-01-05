import useState from 'react'
import { Link } from 'react-router-dom'

const Buddy = (props) => {
    return (
        <li>
            <Link to={`/api/chat/${props.user.id}`}>{props.user.username}</Link>
            <button onClick={() => {
                props.handleDelete(props.user.id)
            }}>Delete</button>
        </li>
    )
}

export default Buddy

