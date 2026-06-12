import MatchCard from '../components/MatchCard'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Typography from '@mui/material/Typography'
import 'react-datepicker/dist/react-datepicker.css'


const MatchesPage = () => {

  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRound, setSelectedRound] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json')
      const data = await response.json()
      data.matches.sort((a, b) => new Date(a.date) - new Date(b.date))
      setMatches(data.matches)
      const uniqueRounds = [...new Set(data.matches.map(match => match.round))]
      setRounds(uniqueRounds)
    }
    getData()
  }, [])

  const filteredMatches = matches
    .filter(match =>
      match.round.toLowerCase().includes(search.toLowerCase())
      || match.team1.toLowerCase().includes(search.toLowerCase())
      || match.team2.toLowerCase().includes(search.toLowerCase())
      || (match.group && match.group.toLowerCase().includes(search.toLowerCase()))
      || (match.ground && match.ground.toLowerCase().includes(search.toLowerCase()))
      || match.time.toLowerCase().includes(search.toLowerCase())
    )
    .filter(match => selectedRound ? match.round === selectedRound : true)
    .filter(match => selectedDate
      ? match.date === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      : true)

  const groupedMatches = filteredMatches.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = []
    acc[match.round].push(match)
    return acc
  }, {})

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px' }}>

      <Typography variant="h4" component="h1" gutterBottom>
        Matches
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Browse fixtures by round, date, or team.
      </Typography>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search matches..."
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Rounds</option>
          {rounds.map((round, index) => (
            <option key={index} value={round}>{round}</option>
          ))}
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          isClearable
          placeholderText="Select a match date"
        />
      </div>

      {Object.entries(groupedMatches).map(([round, roundMatches]) => (
        <div key={round} style={{ backgroundColor: 'var(--dark-green)', marginBottom: '32px', border: '5px solid white', borderRadius: '15px', padding: '16px' }}>
          <Typography align="center" variant="h4" component="h2" sx={{ color: 'white', mb: 2 }}>
            {round}
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {roundMatches.map((match, index) => (
              <div key={index} style={{ width: '280px' }}>
                <MatchCard {...match} />
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}

export default MatchesPage