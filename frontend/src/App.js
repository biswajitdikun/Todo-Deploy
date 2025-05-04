import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import config from './config';

const theme = createTheme({
  palette: {
    primary: {
      main: config.THEME.PRIMARY_COLOR,
    },
    secondary: {
      main: config.THEME.SECONDARY_COLOR,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={config.ROUTES.LOGIN} element={<Login />} />
            <Route path={config.ROUTES.REGISTER} element={<Register />} />
            <Route
              path={config.ROUTES.TASKS}
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route path={config.ROUTES.HOME} element={<Navigate to={config.ROUTES.TASKS} replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
