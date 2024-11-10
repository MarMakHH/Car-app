
import './App.css'
import Carlist from './components/CarList'

import { AppBar, Typography } from '@mui/material'
function App() {
    return (
        <>
            <AppBar position="static">
                <Typography variant="h6">
                    Car Shop
                </Typography>
            </AppBar>
            <Carlist />
        </>
    )
}

export default App
