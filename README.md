# Notes Application (MERN Stack)

A full-stack web application for creating and managing personal notes, built with the MERN (MongoDB, Express, React, Node.js) stack.

## Live Demo

Access the live application: [Notes App](https://notesappfront-9adu.onrender.com/login)

## Features

- **User Authentication**: Secure signup and login functionality using JWT and bcrypt
- **Notes Management**: Full CRUD operations (Create, Read, Update, Delete) for notes
- **Categorization**: Organize notes by categories for better management
- **Search & Filter**: Find notes quickly with search and category filtering
- **Responsive Design**: Works seamlessly across different screen sizes

## Technology Stack

### Frontend
- **React.js**: For building the user interface
- **React Router**: For navigation and routing
- **Axios**: For making HTTP requests to the backend
- **CSS**: Custom styling for a clean, modern UI

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing user data and notes
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB
- **JWT (JSON Web Tokens)**: For secure authentication
- **Bcrypt.js**: For password hashing

## Project Structure

### Backend (MVC Architecture)
- **Models**: Defines the data structure for users and notes
- **Controllers**: Handles business logic for processing requests
- **Routes**: Defines API endpoints
- **Middleware**: For authentication and request processing

### Frontend
- **Components**: Reusable UI elements
- **Pages**: Main application views
- **Context**: For state management (auth context)
- **Utilities**: Helper functions and API service

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed (local) or MongoDB Atlas account (cloud)
- Git installed

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/RanitaGhosh04/NotesApp.git
   cd notes-app
   ```

2. Install server dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install client dependencies
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server
   ```bash
   # In the server directory
   npm start
   
   # In a new terminal, in the client directory
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login and get authentication token

### Notes
- `GET /api/notes`: Get all notes for logged-in user
- `POST /api/notes`: Create a new note
- `PUT /api/notes/:id`: Update a specific note
- `DELETE /api/notes/:id`: Delete a specific note

## Security Measures

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with authentication middleware
- Input validation and sanitization
- CORS configuration

## Future Enhancements
- Dark/Light theme toggle

## Deployment

- Frontend: Deployed on [Render](https://render.com)
- Backend: Deployed as a separate service on [Render](https://render.com)
- Database: MongoDB Atlas cloud database

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MongoDB Atlas for database hosting
- Render for application deployment
