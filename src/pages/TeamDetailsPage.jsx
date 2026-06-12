import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TeamCard from '../components/TeamCard'

const TeamDetailsPage = () => {
    const { id } = useParams()
    const [team, setTeam] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.teams.json')
            const data = await response.json()
            const teamResult = data.find(t => t.fifa_code === id)
            setTeam(teamResult)
        }
        getData()
    }, [id])

    return (
        <div>
            {team ? <TeamCard {...team} /> : <p>Loading team details...</p>}
        </div>
    )
}

export default TeamDetailsPage