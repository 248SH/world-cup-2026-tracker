import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const getFlag = (teamName) => {
  const code = teamNameToCountryCode[teamName]
  if (!code) return null
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={teamName}
      style={{ width: '40px', height: '27px' }}
    />
  )
}

const MatchCard = ({ round, date, time, team1, team2, group, ground, score, goals1, goals2 }) => {
  return (
    <Box sx={{
      backgroundColor: 'var(--light-green)',
      color: 'white',
      border: '5px solid white',
      borderRadius: '10px',
      padding: '16px',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    }}>
      <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
        {round}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
          {getFlag(team1)}
          <Typography variant="body2" mt={1} align="center">{team1}</Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold">vs</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
          {getFlag(team2)}
          <Typography variant="body2" mt={1} align="center">{team2}</Typography>
        </Box>
      </Box>

      <Box mt={2} sx={{ textAlign: 'center' }}>
        <Typography variant="body2">{date} at {time}</Typography>
        {group && <Typography variant="body2">{group}</Typography>}
        <Typography variant="body2">{ground}</Typography>
        <Accordion>
          <AccordionSummary sx={{
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            margin: 0,
          }}
            expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ margin: 0,}}>
            {score && <Typography variant="body2">{score.ft[0]} - {score.ft[1]}</Typography>}
            {goals1 && <Typography variant="body2">Goals: {goals1.map(g => g.name).join(', ')}</Typography>}
            {goals2 && <Typography variant="body2">Goals: {goals2.map(g => g.name).join(', ')}</Typography>}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}

export default MatchCard