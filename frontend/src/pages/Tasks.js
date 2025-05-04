import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTitle(task.title);
      setDescription(task.description || '');
    } else {
      setEditingTask(null);
      setTitle('');
      setDescription('');
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setError('');
  };

  // Validate title
  const validateTitle = (value) => {
    if (value.length > 0 && value.length < 3) {
      return 'Title must be at least 3 characters long';
    }
    if (value.length > 100) {
      return 'Title must not exceed 100 characters';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate title
    const titleError = validateTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, { title, description });
      } else {
        await taskService.createTask({ title, description });
      }
      handleClose();
      loadTasks();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save task. Please try again.');
      console.error('Failed to save task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      loadTasks();
    } catch (error) {
      setError('Failed to delete task. Please try again.');
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskService.updateTask(task._id, {
        completed: !task.completed,
      });
      loadTasks();
    } catch (error) {
      setError('Failed to update task. Please try again.');
      console.error('Failed to update task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: { xs: 2, sm: 4 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 3 
        }}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Welcome, {user?.username}!
          </Typography>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleLogout}
            fullWidth={false}
          >
            Logout
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            mb: 3 
          }}>
            <Typography 
              variant="h5"
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Your Tasks
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              fullWidth={false}
            >
              Add Task
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task._id}
                  sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1, sm: 0 },
                    py: { xs: 2, sm: 1 }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    width: '100%',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      color="primary"
                    />
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    />
                  </Box>
                  <ListItemSecondaryAction sx={{ 
                    position: { xs: 'relative', sm: 'absolute' },
                    right: { xs: 'auto', sm: 0 },
                    top: { xs: 'auto', sm: '50%' },
                    transform: { xs: 'none', sm: 'translateY(-50%)' },
                    mt: { xs: 1, sm: 0 }
                  }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOpen(task)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(task._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '300px',
            maxHeight: '90vh',
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <DialogTitle>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pb: 0 }}>
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    mx: 2,
                    mt: 1
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
            <Box sx={{ mt: error ? 7 : 0 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                error={!!validateTitle(title)}
                helperText={validateTitle(title)}
                disabled={isSubmitting}
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ 
            px: 3, 
            pb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Button 
              onClick={handleClose} 
              disabled={isSubmitting}
              fullWidth={false}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting || !!validateTitle(title)}
              fullWidth={false}
            >
              {isSubmitting ? <CircularProgress size={24} /> : (editingTask ? 'Update' : 'Add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Tasks; 