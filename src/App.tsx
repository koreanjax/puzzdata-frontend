import { useState, useEffect } from 'react'
import * as CI from 'react-icons/ci'
import './App.css'

interface Input {
  input: string;
}

interface Card {
  id: number;
  name: string;
}

function App() {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState<Card[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        const fetchString = 'http://localhost:8080/search/'
        let fetchKey: string = ''
        if (search.match(/^[0-9]+$/)) {
          fetchKey = 'id='
        } else {
          fetchKey = 'name='
        }
        const response = await fetch(fetchString + fetchKey + search)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Card[] = await response.json()
        setCards(data)
      } catch (e: any) {
        setError(e.message)
      }
    }
    fetchData()
  }
  
  return (
    <>
      <div className="card w-45">
        <div className="gap-2 pl-2 flex align-center height thin-border solid-border rounded bg-zinc-50 border-zinc-300">
          <CI.CiSearch size={24}/>
          <form className="h-full w-full" onSubmit={handleSubmit}>
            <input className="bg-transparent border-0 outline-0 font-tahoma text-light text-sm h-full w-full" value={search} placeholder="Search Monsters.." onChange={e => setSearch(e.target.value)} />
          </form>
        </div>
        <div className="h-full w-inherit">
          {cards.map(card => (
            <button clssName="table-row h-full w-inherit flex">
              <div className="table-cell w-80 text-left font-tahoma">{card.name}</div>
              <div className="table-cell w-20 text-right font-sans">{card.id}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
