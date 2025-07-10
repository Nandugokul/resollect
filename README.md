# Resollect: Modern Task Manager

## Overview
Resollect is a modern, full-stack, cloud-enabled task management app. It lets you create, update, and organize your tasks with a beautiful, responsive UI. Built with React, TypeScript, Vite, Redux Toolkit, and Supabase, it offers a seamless experience across devices, with real-time updates and a focus on productivity.

## Technical Choices
- **Frontend:** React 19, TypeScript, Vite for fast development, Tailwind CSS for styling, Radix UI for accessible components.
- **State Management:** Redux Toolkit for predictable, scalable state.
- **Backend/Database:** Supabase (PostgreSQL + Auth + RESTful API) for cloud data storage and authentication.
- **Notifications:** react-hot-toast for instant feedback.
- **UI/UX:** Modern, mobile-first, with dark/light mode and accessible components.

## Setup & Running Locally
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd resollect
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_KEY=your-supabase-anon-key
     ```
   - You can find these in your [Supabase project dashboard](https://app.supabase.com/).
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Innovative Feature
**Optimistic UI with Real-Time Feedback:**
- When you add, update, or mark a task as done, the UI updates instantly—before the server confirms. If the server fails, changes are reverted and you get a toast notification. This makes the app feel fast and reliable, even on slow networks.

---

Feel free to contribute or suggest features by opening an issue or pull request!
