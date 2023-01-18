import { useState } from 'react'
import supabase from '../config/supabaseClient'

const VoteButton = ({ smoothie, handleVoteState }) => {

    

    // const handleDelete = async () => {
    //     const { data, error} = await supabase 
    //         .from('smoothies')
    //         .delete()
    //         .eq('id',smoothie.id)
    //         .select()

    //     if(error) {
    //         console.log(error)
    //     }
    //     if(data) {
    //         console.log(data)
    //         onDelete(smoothie.id)
    //     }
    // }

    const handleVote = async ( { title, id, rating } ) => {
        rating++
    
        const { data, error } = await supabase
        .from('smoothies')
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
        <button className="smoothie-card" onClick={() => handleVote(smoothie)}>
            <h3>{smoothie.title}</h3>
            {/* <p>{smoothie.method}</p> */}
        </button>
    )
}

export default VoteButton