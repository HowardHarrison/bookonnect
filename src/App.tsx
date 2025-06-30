import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import './App.css'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings, Mode } from './state/theme';
import { RootState } from './main';
import LoginPage from 'scenes/login_page';
import HomePage from 'scenes/home_page';
import DetailPage from 'scenes/home_page/DetailPage';
import RegisterForm from 'scenes/signup_page/RegisterForm';
import NetworkStatus from 'scenes/common/NetworkStatus';
import Router from 'routes/Router';
function App() {
  const mode = useSelector((state: RootState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode.mode as Mode)), [mode.mode]);

  return (
    <div className='app'>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <NetworkStatus>
            <Router/>
          </NetworkStatus>
        </ThemeProvider>  
    </div>
  )
}

export default App
