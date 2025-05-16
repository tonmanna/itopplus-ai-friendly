# AI Friendly Score Web Application

A modern web application for analyzing and scoring websites based on their AI-friendliness. Built with React and Tailwind CSS.

## Features

- Website AI-friendliness scoring system
- User authentication with social login options
- Dashboard to view and manage website scores
- Submit websites for analysis
- Articles section with AI optimization tips
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-friendly-score.git
cd ai-friendly-score
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/        # Reusable UI components
  ├── pages/            # Page components
  │   ├── auth/         # Authentication pages
  │   ├── Dashboard.js  # Main dashboard
  │   ├── Submit.js     # Website submission
  │   ├── Articles.js   # Articles listing
  │   └── About.js      # About page
  ├── App.js           # Main application component
  └── index.js         # Application entry point
```

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Router](https://reactrouter.com/) - Routing
- [Headless UI](https://headlessui.dev/) - UI components
