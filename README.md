# Skill Scanner

## Tagline
AI-powered career navigator that discovers skills, suggests career paths, and prepares users for the future of work.

## Overview
Skill Scanner is an AI-powered career navigator that quizzes users, maps their skills, recommends career paths, provides curated learning resources, and connects them to real opportunities.

## Target Audience
- **Students (10th standard & above):** Choosing streams, subjects, or higher studies.
- **University Students & Fresh Graduates:** Exploring career roles, upskilling, preparing for jobs.
- **Professionals:** Reskilling, switching domains, or tracking career readiness.

## Features
- AI-powered skill and aptitude quiz.
- Personalized career path recommendations.
- Learning resources hub with curated content.
- Dashboard with progress tracking and gamified badges.
- Community hub for discussions and mentorship.
- Job and internship matching system.

## Roadmap Features
- AI Interview Coach
- Scholarship Finder
- Blockchain Certificate Vault
- AR/VR Career Simulations
- Multi-language support
- AI Career Trends Forecasting

## Tech Stack
- **Frontend:** Next.js / React (web), Flutter or React Native (mobile)
- **Backend:** Node.js + Express
- **Database & Auth:** Firebase (Auth, Firestore, Storage) or Supabase
- **AI Engine:** Google Vertex AI
- **Integrations:**
  - YouTube API → Fetch learning content
  - Google Cloud Storage → File uploads
  - Looker Studio → Analytics dashboards
  - Blockchain: Polygon / Ethereum layer for certificates
  - 3D/Animations: Three.js + Framer Motion

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd career-cosmos-quest-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add placeholders for your API keys:
   ```env
   GEMINI_API_KEY=YOUR_API_KEY
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Quiz Generation
1. Navigate to the Quiz Generator page.
2. Enter your qualification (e.g., High School, Bachelor's Degree).
3. Click "Generate Quiz" to fetch questions.

### Firebase Integration
Ensure Firebase is properly configured in `src/firebaseConfig.ts`:
- Replace placeholders with your Firebase project credentials.
- Enable Firestore and Authentication in the Firebase Console.

### Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider (e.g., Firebase Hosting, Vercel).

