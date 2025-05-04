# Todo List Frontend

This is the frontend application for the Todo List project built with React and Material-UI.

## Features

- User authentication (login/register)
- Task management (create, read, update, delete)
- Responsive design
- Modern UI with Material-UI components
- Protected routes
- JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running on port 5000

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Development mode:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── context/       # React context providers
  ├── pages/         # Page components
  ├── services/      # API services
  └── App.js         # Main application component
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Dependencies

- React
- React Router DOM
- Material-UI
- Axios
- Emotion (for styled components)

## Environment Variables

The application expects the backend server to be running at `http://localhost:5000`. If your backend is running on a different URL, you'll need to update the API URL in the following files:

- `src/context/AuthContext.js`
- `src/services/taskService.js`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
