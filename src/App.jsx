import MatchesPage from './pages/MatchesPage'
import TeamsPage from './pages/TeamsPage'
import TeamDetailsPage from './pages/TeamDetailsPage'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<MatchesPage />} />
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/team-details/:id' element={<TeamDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App