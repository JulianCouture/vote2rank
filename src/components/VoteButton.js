import { useState } from 'react'
import supabase from '../config/supabaseClient'

const VoteButton = ({ item, handleVoteState }) => {

    

    // const handleDelete = async () => {
    //     const { data, error} = await supabase 
    //         .from('items')
    //         .delete()
    //         .eq('id',item.id)
    //         .select()

    //     if(error) {
    //         console.log(error)
    //     }
    //     if(data) {
    //         console.log(data)
    //         onDelete(item.id)
    //     }
    // }

    const handleVote = async ( { title, id, rating } ) => {
        rating++
    
        const { data, error } = await supabase
        .from('items')
        .update({rating})
        .eq('id',id)
        .select()
    
        if(error) {
          console.log(error)
        }
    
        if(data) {
          console.log(data)
        }
        handleVoteState()
        console.log('hello')
      }

    return (
        <div className="vote-button" onClick={() => handleVote(item)}>
            <h3>{item.title}</h3>
            {/* <p>{item.method}</p> */}
        </div>
    )
}

export default VoteButton