

const Message = (props) => {
  return (
    <div className="card w-100">
        <div className="card-header">
            id: {props.obj.sender}
        </div>
        <div className="card-body">
            <blockquote className="blockquote mb-0">
            <p>{props.obj.message}</p>
            </blockquote>
        </div>
    </div>
  )
}


export default Message