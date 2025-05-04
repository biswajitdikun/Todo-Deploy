import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import { validatePassword } from '../utils/passwordValidation';
import { formatValidationError } from '../utils/errorFormatter';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const passwordValidation = validatePassword(password);

  // Validate username
  const validateUsername = (value) => {
    if (value.length > 0 && value.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    return '';
  };

  // Validate email
  const validateEmail = (value) => {
    if (value.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address (e.g., name@example.com)';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Validate all fields before submission
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);

    if (usernameError) {
      setError(usernameError);
      return;
    }

    if (emailError) {
      setError(emailError);
      return;
    }
    
    if (!passwordValidation.isValid) {
      setError('Please make sure your password meets all the requirements below.');
      return;
    }
    
    try {
      await register(username, email, password);
      navigate(config.ROUTES.TASKS);
    } catch (err) {
      setError(formatValidationError(err));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom color="primary">
              {config.APP_NAME}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join us to manage your tasks efficiently
            </Typography>
          </Box>

          <Collapse in={!!error}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                '& .MuiAlert-message': {
                  width: '100%',
                }
              }}
            >
              {error}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              placeholder="Choose a username (min. 3 characters)"
              error={!!validateUsername(username)}
              helperText={validateUsername(username)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              placeholder="Enter your email address"
              error={!!validateEmail(email)}
              helperText={validateEmail(email)}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              placeholder="Create a strong password"
              error={password.length > 0 && !passwordValidation.isValid}
              helperText={password.length > 0 && !passwordValidation.isValid ? "Password requirements:" : ""}
            />

            {password.length > 0 && (
              <List dense sx={{ mt: 1, mb: 2 }}>
                <ListItem>
                  <ListItemIcon>
                    {password.length >= 8 ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="At least 8 characters" 
                    secondary={password.length < 8 ? `Current length: ${password.length}` : ''}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {/[A-Z]/.test(password) ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText primary="One uppercase letter" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {/[a-z]/.test(password) ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText primary="One lowercase letter" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {/[0-9]/.test(password) ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText primary="One number" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText primary={`One special character (!@#$%^&*(),.?":{}|<>)`} />
                </ListItem>
              </List>
            )}

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to={config.ROUTES.LOGIN}
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ArrowBackIcon />}
                fullWidth
              >
                Back to Login
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!passwordValidation.isValid || !!validateUsername(username) || !!validateEmail(email)}
                fullWidth
              >
                Create Account
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 