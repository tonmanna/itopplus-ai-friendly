## AI Code Generation Prompt: "AI Friendly Score" Web Application

**Project Overview:**

Create a responsive web application that allows users to view and submit websites to get an "AI Friendly Score." This score indicates how well a website is optimized for AI crawlers, accessibility, and other AI-related factors. The application should have user authentication, a dashboard to display website scores, a submission form, an articles section, and an about us page.

**Core Functionality: AI Friendly Score**

- **Scoring Logic (Placeholder):** For now, the actual scoring mechanism can be a placeholder (e.g., a random number generator or a simple hardcoded logic). The focus is on the UI/UX for displaying these scores.

- **Score Display:**

  - Scores range from 0 to 99.

  - **Color Coding:**

    - 0-60: Red

    - 61-80: Yellow

    - 81-99: Green

  - **Badges:** Each score range (Red, Yellow, Green) should have a distinct visual badge associated with it. The badges should be modern and clearly distinguishable.

**Key Pages and Features:**

**1. Login Page (`/login`)** \* Clean and modern design. \* Social Login Options: \* Sign in with Google \* Sign in with Facebook \* Sign in with Microsoft \* (Optional: Traditional email/password registration and login)

**2. Website List & Score Display Page (`/dashboard` or `/websites`)** \* **Layout:** \* The primary purpose of this page is to list websites and their AI Friendly Scores. \* The design should be inspired by the IGN score page layout: \* Each website entry should be a card or a prominent list item. \* Display the website name/URL. \* Clearly display the numerical score. \* The score should be color-coded as per the ranges (Red, Yellow, Green). \* Display the corresponding badge next to or integrated with the score. \* (Optional: a short snippet or summary of the website, date scored). \* **Functionality:** \* **Pagination:** Implement pagination if the list of websites is long. \* **Sorting/Filtering (Optional):** Allow users to sort by score, date added, or filter by score range. \* **Data Source (Placeholder):** For now, use mock data for the list of websites and their scores.

**3. Submit Website Page (`/submit` or `/add-website`)** \* A simple form where authenticated users can submit a website URL to be "tested" or "scored." \* Input field for the website URL. \* A "Submit" or "Analyze" button. \* Upon submission (for now), it can either: \* Show a success message and indicate the website is queued for analysis. \* Or, for demonstration, immediately generate a random score and redirect to the website list or a detail page for that new entry.

**4. Article Page (`/articles` or `/blog`)** \* A section to display articles related to AI, website optimization, AI-friendly practices, etc. \* **List View:** Display a list of articles with titles, summaries, and featured images (if any). \* **Detail View:** Clicking an article title should lead to the full article page. \* Content can be placeholder/mock content (e.g., Lorem Ipsum).

**5. About Us Page (`/about`)** \* A page providing information about the application, its mission, or the team behind it. \* Placeholder text is acceptable.

**General UI/UX & Technical Considerations:**

- **Focus:** The application should be user-friendly and easy to navigate.
- **Generate:** The application should be fast and responsive and frontend only.

- **Technology Stack (Suggestion - can be adapted by the AI):**

  - Frontend: React.js with Tailwind CSS.

- **Design:**

  - Modern, clean, and intuitive user interface.

  - Responsive design: The application must work well on desktop, tablet, and mobile devices.
