import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import teamNameToCountryCode from '../lib/teamNameToCountryCode'

const getFlag = (teamName) => {
    const code = teamNameToCountryCode[teamName]
    if (!code) return null
    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={teamName}
            style={{ width: '60px', height: '40px', objectFit: 'cover' }}
        />
    )
}

const TeamCard = ({ name, fifa_code, group, confed }) => {
    return (
        <Box sx={{
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            border: '5px solid white',
            borderRadius: '10px',
            padding: '16px',
            width: '20vw',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}>
            <Box mb={1}>
                {getFlag(name)}
            </Box>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                {name}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'var(--light-green)' }}>
                {confed}
            </Typography>
            <Typography variant="body2" mb={0.5}>
                Group {group}
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                {fifa_code}
            </Typography>
        </Box>
    )
}

export default TeamCard