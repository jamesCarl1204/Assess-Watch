# AssessWatch

**Online Assessment and Interview Activity Monitoring System**

AssessWatch is a web application designed to help teachers review activity signals during online assessments and remote interviews. Its dashboard organizes events such as tab changes, loss of window focus, and paste activity so that an instructor can review the context when needed.

Activity signals are intended to support human review. **They are not proof of cheating or misconduct**, and the system should not make disciplinary decisions based on a single event.

## Current Project Status

This repository is under active development.

- Teacher registration, login, and logout are implemented in the backend.
- The teacher dashboard interface includes overview cards, a student list, search and filtering controls, and activity-related views.
- Backend routes are present for authentication, sessions, and activity events.
- The student-side monitoring workflow and complete end-to-end real-time monitoring experience are still being developed.

Please refer to the current source code for the latest implementation status.

## Features

### Available in the current implementation

- Teacher account registration and authentication
- JWT-based authentication using an HTTP-only cookie
- Teacher dashboard interface
- Student roster with search and filtering UI
- Activity feed and per-student activity timeline UI
- Light and dark theme

### Monitoring workflow in development

- Student-side activity collection and reporting
- Complete live assessment-session workflow
- End-to-end real-time activity updates and alerts

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- CSS Modules
- Phosphor Icons

**Backend**
- Node.js
- Express
- MySQL
- JSON Web Tokens (JWT)
- bcrypt
- Helmet
- cookie-parser

## Project Structure

```text
Assess-Watch/
├── src/                 # React frontend
├── public/              # Static frontend assets
├── server/
│   ├── config/          # Backend configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Database models
│   ├── routes/          # Authentication, session, and event routes
│   ├── utils/            # Backend utilities
│   ├── validator/       # Request validation
│   ├── app.js           # Express API entry point
│   └── package.json
├── package.json         # Frontend scripts and dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL

### 1. Clone the repository

```bash
git clone https://github.com/jamesCarl1204/Assess-Watch.git
cd Assess-Watch
```

### 2. Install frontend dependencies

From the repository root:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure the backend environment

Create a `.env` file inside the `server/` directory:

```env
PORT=3000
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

JWT_SECRET=replace_with_a_long_random_secret
```

Create the MySQL database specified by `DB_NAME` and configure the connection values for your local environment.

Do not commit your real `.env` file or share your database credentials.

### 5. Start the backend

From the `server/` directory:

```bash
node app.js
```

The API uses port 3000 by default, or the port configured through `PORT`.

### 6. Start the frontend

Open another terminal at the repository root:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal (typically `http://localhost:5173`).

## Available Scripts

### Frontend (repository root)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |

### Backend (`server/`)

Start the API with `node app.js`. A dedicated backend `dev` script is not currently defined in `server/package.json`.

## Responsible Use

AssessWatch is intended to provide instructors with organized context about activity during online assessments. Browser events can have legitimate explanations, including accessibility needs, technical interruptions, or normal user behavior. Any review should consider context and follow the institution's assessment policies.

## Project Goals

- Build a clear interface for reviewing assessment activity.
- Organize activity events by student and session.
- Support instructor review without treating automated signals as definitive evidence.

## Author

**James Carl Chouuser**

[GitHub Profile](https://github.com/jamesCarl1204)
