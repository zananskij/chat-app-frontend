import useState from 'react'


const Buddy = (props) => {
    return (
        <li>
            {props.user.username}
            <button onClick={() => {
                props.handleDelete(props.user.id)
                console.log(props.user)
            }}>Delete</button>
        </li>
    )
}

export default Buddy