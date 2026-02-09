import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch, loading }) {
  const [searchId, setSearchId] = useState('')
  const [searching, setSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchId.trim()) {
      return
    }

    setSearching(true)
    await onSearch(searchId)
    setSearchId('')
    setSearching(false)
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter Product ID"
        className="search-input"
        disabled={loading || searching}
      />
      <button 
        type="submit" 
        className="search-btn"
        disabled={loading || searching}
      >
        {searching ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default SearchBar
