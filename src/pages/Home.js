import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components 
import ItemCard from "../components/ItemCard"
import VoteButton from "../components/VoteButton"
import AddCard from "../components/AddCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [items, setitems] = useState(null)
  const [orderBy, setOrderBy] = useState('rating')
  const [voteitems, setVoteitems] = useState(null)
  const [voteState,setVoteState] = useState(0)
  const [question,setQuestion] = useState('Which is better?')

  console.log(items)

  
  const handleVoteState = () => {
      setVoteState(state => state+1)
  }


  const handleDelete = (id) => {
    setitems(previtems => {
      return previtems.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchitems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select()
        .order(orderBy, {ascending: false})

        if (error) {
          setFetchError('Could not fetch data')
          setitems(null)
        }
        if (data) {
          setitems(data)
          setFetchError(null)
        }
    }

    fetchitems()
    console.log(voteState)

  },[orderBy,voteState])

  const randomitem =   () => {
    // copy array, delete item after choosing random. After button click. reset randomArray
    let rand1 = Math.floor(Math.random() * items.length);
    let rand2 = rand1
    // console.log(rand1,rand2)
    while(rand2===rand1) {
      rand2 = Math.floor(Math.random() * items.length);
    }
    console.log(rand1,rand2)

    return [rand1,rand2]
  }

  const random = () => randomitem()
  console.log(random)

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      <h1 className="question">{question}</h1>
      {items && (
        <div>
          {items.length > 1 && (
            <div className="top">
        {/* <ItemCard key={items[0].id} item={items[0]} onDelete={handleDelete}/> */}
        <div className="vote">
          {/* <button className="choice1" onClick={() => console.log(items[1].title)}>{randomitem()}</button> */}
          <VoteButton  item={items[randomitem()[0]]} onDelete={handleDelete} handleVoteState={handleVoteState}/>
          <div className="vs">VS</div>
          {/* <button className="choice2">{randomitem()}</button> */}
          <VoteButton  item={items[randomitem()[1]]} onDelete={handleDelete} handleVoteState={handleVoteState}/>
        </div>
        </div>
          )}
        
        <div className="items">
          {/* <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div> */}
          <div className="item-grid">
            {items.map(item => (
              <ItemCard key={item.id} item={item} onDelete={handleDelete} two={ items.length > 2 ? false : true}/>
            ))}
            
          </div>
          {/* <AddCard handleVoteState={handleVoteState}/> */}
        </div>
        </div>
      )}
    </div>
  )
}

export default Home