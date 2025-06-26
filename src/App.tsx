import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import './App.css'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings, Mode } from './state/theme';
import { RootState } from './main';
import LoginPage from 'scenes/LoginPage';
import HomePage from 'scenes/HomePage';
function App() {
  const mode = useSelector((state: RootState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode.mode as Mode)), [mode.mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>  
    </div>
  )
}

export default App
