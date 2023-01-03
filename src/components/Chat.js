import BuddyList from './BuddyList'
import { useEffect, useParams } from 'react'


const Chat = (props) => {
    let { id } = useParams()

    useEffect(() => {
        props.getAllBuddies()
    }, [])

    return (
        <main>
            <div>
                {/* spawns the buddy list */}
                {props.allBuddies.map(obj => <BuddyList user={obj} handleDelete={props.handleDelete} changeTargetUser={props.changeTargetUser}/>)}
            </div>

            <div>
                <div></div>
                
                
                <div>
                    <input type="text" />
                    <input type="submit" value='Enter' />
                </div>
            </div>

        </main>
    )
}


export default Chat