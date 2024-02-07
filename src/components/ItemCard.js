import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const ItemCard = ({ item, onDelete, two, index }) => {

    const handleDelete = async () => {
        // if(two == false){
        //     const { data, error} = await supabase 
        //     .from('items')
        //     .delete()
        //     .eq('id',item.id)
        //     .select()

        //     if(error) {
        //      console.log(error)
        //     }
        //     if(data) {
        //         console.log(data)
        //         onDelete(item.id)
        //     }
        // }
        const { data, error} = await supabase 
            .from('items')
            .delete()
            .eq('id',item.id)
            .select()

            if(error) {
             console.log(error)
            }
            if(data) {
                console.log(data)
                onDelete(item.id)
            }
        
    }

    return (
        <div className="item-card">
            <h3>{item.title}</h3>
            {/* <p>{item.method}</p> */}
            {/* <div className="rating">{index+1}</div> */}
            <div className="rating">{item.rating}</div>
            <div className="buttons">
                <Link to={'/' + item.id}>
                    <i className='material-icons'>edit</i>
                </Link>
                <i className='material-icons' onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default ItemCard