import TeamCard from '../components/TeamCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputBase from '@mui/material/InputBase'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

const TeamsPage = () => {

    const [teams, setTeams] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.teams.json')
            const data = await response.json()
            setTeams(data)
            const uniqueGroups = [...new Set(data.map(team => team.group))]
            setGroups(uniqueGroups)
        }
        getData()
    }, [])

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px' }}>

            <Typography variant="h4" fontWeight="bold" mb={1}>
                Teams
            </Typography>
            <Typography variant="body1" sx={{ color: '#a0aec0', mb: 3 }}>
                Browse all 48 qualified nations.
            </Typography>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <InputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search teams..."
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        color: 'black',
                    }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel sx={{ color: 'white' }}>Group</InputLabel>
                    <Select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        label="Group"
                        sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '.MuiSvgIcon-root': { color: 'white' },
                        }}
                    >
                        <MenuItem value="all">All Groups</MenuItem>
                        {groups.map((group, index) => (
                            <MenuItem key={index} value={group}>{group}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {teams
                    .filter(team => team.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(team => selectedGroup === 'all' ? true : team.group === selectedGroup)
                    .map((team, index) => (
                        <Link to={`/team-details/${team.fifa_code}`} key={index} style={{ textDecoration: 'none' }}>
                            <TeamCard {...team} />
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default TeamsPage