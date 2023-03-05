import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const AddCard = () => {

    

    return (
        <div className="item-card">
            <h3>add item </h3>
            {/* <p>{item.method}</p> */}
            {/* <div className="rating">{item.rating}</div>
            <div className="buttons">
                <Link to={'/' + item.id}>
                    <i className='material-icons'>edit</i>
                </Link>
                <i className='material-icons'>delete</i>
            </div> */}
        </div>
    )
}

export default AddCard