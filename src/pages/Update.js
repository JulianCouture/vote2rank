import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !rating) {
      setFormError("Please fill in all the fields correctly")
      return
    }

    const { data, error } = await supabase
    .from('items')
    .update({ title, rating})
    .eq('id',id)
    .select()

    if(error) {
      console.log(error)
      setFormError("Please fill in all the fields correctly")
    }

    if(data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }



  }


  useEffect(() => {
    const fetchitem = async () => {
      const { data, error } = await supabase
      .from('items')
      .select()
      .eq('id', id)
      .single()

      if (error) {
        navigate('/', { replace: true})
      }
      if (data) {
        setTitle(data.title)
        setRating(data.rating)
        console.log(data)
      }
    }

    fetchitem()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        

        <label htmlFor="title">Rating</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update