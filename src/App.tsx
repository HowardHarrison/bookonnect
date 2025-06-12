import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import './App.css'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings, Mode } from './state/theme';
import LoginPage from "scenes/loginPage";
import { RootState } from './main';
function App() {
  const mode = useSelector((state: RootState) => state.mode) as Mode;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>  
    </div>
  )
}

export default App
