import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {

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
    .from('smoothies')
    .insert([{ title, method, rating}])
    .select()

    if(error) {
      console.log(error)
      setFormError("Please fill in all the fields correctly")
    }
    if (data) {
      console.log(data)
      setFormError(null)
      // navigate('/')
    }
  }

  const handleQuestionSubmit = (e) => {
  e.preventDefault()
  console.log(question)

  }

  return (
    <div className="page create">
      <form onSubmit={handleQuestionSubmit}>
        <label htmlFor="title">Enter Question</label>
        <input
          type='text'
          id='question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />


        <button>Enter</button>

        {formError && <p className="error">{formError}</p>}
      </form>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Add List Item</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <button>Add</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    
  )
}

export default Create