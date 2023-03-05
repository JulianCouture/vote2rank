import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddCard = (handleVoteState) => {
    handleVoteState()
    const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const method = 0;
  const rating = 0;
  const [formError, setFormError] = useState('')
  const [question,setQuestion] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      setFormError("hut")
      return
    }


    const { data, error } = await supabase
    .from('items')
    .insert([{ title, method, rating}])
    .select()

    if(error) {
      console.log(error)
      setFormError("Please fill in all the fields correctly")
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
    handleVoteState()
    handleVoteState()
  }

  const handleQuestionSubmit = (e) => {
  e.preventDefault()
  console.log(question)
  
  }

    return (
        
            <form className="item-card" onSubmit={handleSubmit}>
        <label htmlFor="title"><h3>Add List Item</h3></label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <button>Add</button>

        {formError && <p className="error">{formError}</p>}
      </form>
        
    )
}

export default AddCard