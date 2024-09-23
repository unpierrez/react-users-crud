import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from './theme/theme'
import { Box, Container, ThemeProvider } from '@mui/material'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { SnackbarProvider } from './context/SnackbarContext/SnackbarProvider'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Container>
          </Box>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
