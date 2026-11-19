# LearnLark - Day 10: React Router & Multi-Page Application

A responsive multi-page online learning platform built with **React 18**, **React Router DOM v6** and **Vite** for the Apex Lark Full Stack Development Internship (Day 10).

## Features

**Routing**
- Routes: Home, About, Services, Courses, Contact, Login, Dashboard, 404 page
- Invalid route redirects (`/home`, `/course`, `/service`, `/signin`)
- `ProtectedRoute` guards the Dashboard and sends guests to Login (and back after login)

**Navbar**
- Active link highlight, logo, mobile hamburger menu, conditional Login / Logout buttons

**Dashboard**
- Welcome message, user profile card, course statistics, recent activities, quick action cards
- Responsive sidebar with Overview / My courses / Activity views

**Extra features (8)**
1. Dark / Light mode (saved in localStorage)
2. Loading spinner (app start, login and contact form)
3. Scroll-to-top on route change plus a floating button
4. Breadcrumbs
5. Dynamic page titles
6. Animated page transitions
7. User profile dropdown
8. Toast notifications

**Validation and empty states**
- Login and contact form validation with clear messages
- Empty states for course search and dashboard activity

## Authentication (demo)

Any valid email and a password with 6 or more characters works. The user is stored in `localStorage`; there is no real backend.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Project structure

```
Day-10-React-Router/
├── public/
├── src/
│   ├── components/  Navbar, Footer, ProtectedRoute, Loader, Breadcrumbs, ScrollToTop
│   ├── context/     AppContext (auth, theme, toasts)
│   ├── data/        courses.js
│   ├── pages/       Home, About, Services, Courses, Contact, Login, Dashboard, NotFound
│   ├── styles/      style.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Screenshots

Add your screenshots to a `screenshots/` folder and list them here (Home desktop, Home mobile, Courses, Login, Dashboard, Dark mode, 404).
