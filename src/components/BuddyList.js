import useState from 'react'
import { Link } from 'react-router-dom'

const Buddy = (props) => {
    return (
    <div className="list-group">
        <li className="list-group-item">
            <Link to={`/api/chat/${props.user.id}`}>{props.user.username}</Link>
            <button className="btn btn-primary mx-3"onClick={() => {
                props.handleDelete(props.user.id)
            }}>Delete</button>
        </li>
    </div>
    )
}

export default Buddy

