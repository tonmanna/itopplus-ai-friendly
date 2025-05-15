# AI Friendly Score Application

A web application for scoring and analyzing website AI-friendliness.

## Project Structure

```
itopplus-ai-friendly/
├── backend/              # Node.js backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── server.js       # Entry point
└── frontend/            # Angular frontend
    ├── src/
    ├── angular.json
    └── package.json
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Angular CLI

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Install Angular CLI globally:
   ```bash
   npm install -g @angular/cli
   ```
5. Create and set up the Angular frontend:
   ```bash
   ng new frontend --routing --style=scss
   cd frontend
   npm install
   ```

## Development

1. Start the backend server:
   ```bash
   npm run dev
   ```
2. Start the Angular development server:
   ```bash
   cd frontend
   ng serve
   ```

The application will be available at:

- Backend API: http://localhost:3000
- Frontend: http://localhost:4200

## Features

- Social login (Google, Facebook, Microsoft)
- Website AI-friendliness scoring
- Dashboard with website scores
- Article management
- Responsive design
