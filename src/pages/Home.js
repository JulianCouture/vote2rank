import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components 
import SmoothieCard from "../components/SmoothieCard"
import VoteButton from "../components/VoteButton"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('rating')
  const [voteSmoothies, setVoteSmoothies] = useState(null)
  const [voteState,setVoteState] =useState(0)

  console.log(smoothies)

  
  const handleVoteState = () => {
      setVoteState(state => state+1)
  }


  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, {ascending: false})

        if (error) {
          setFetchError('Could not fetch the smoothies')
          setSmoothies(null)
        }
        if (data) {
          setSmoothies(data)
          setFetchError(null)
        }
    }

    fetchSmoothies()
    console.log(voteState)

  },[orderBy,voteState])

  const randomSmoothie =   () => {
    // copy array, delete smoothie after choosing random. After button click. reset randomArray
    let rand1 = Math.floor(Math.random() * smoothies.length);
    let rand2 = Math.floor(Math.random() * smoothies.length);

    setVoteSmoothies = randomSmoothie()
    return [rand1,rand2]
  }



  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      <h1 className="question">Which is better?</h1>
      {smoothies && (
        <div>
        <div className="top">
        <div className="vote">
          {/* <button className="choice1" onClick={() => console.log(smoothies[1].title)}>{randomSmoothie()}</button> */}
          <VoteButton key={smoothies[0].id} smoothie={smoothies[Math.floor(Math.random() * smoothies.length)]} onDelete={handleDelete} handleVoteState={handleVoteState}/>
          <div className="vs">VS</div>
          {/* <button className="choice2">{randomSmoothie()}</button> */}
          <VoteButton key={smoothies[1].id} smoothie={smoothies[Math.floor(Math.random() * smoothies.length)]} onDelete={handleDelete} handleVoteState={handleVoteState}/>
        </div>
      </div>
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default Home