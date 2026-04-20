# 🎓 College Event Management System

A browser-based web application that allows college students and administrators to create, browse, filter, and register for campus events — all without a backend server.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The College Event Management System is a lightweight, front-end-only application built with vanilla HTML, CSS, and JavaScript. It enables students to discover upcoming college events and register for them, while allowing organizers to post new events — all data is persisted in the browser's `localStorage`.

---

## ✨ Features

- **View Events** — Browse all upcoming college events in a responsive card grid layout
- **Create Events** — Submit new events with name, date, time, category, location, and description
- **Filter Events** — Filter the event list by category (Technical, Cultural, Sports, Academic) and/or date
- **Register for Events** — Register with name, email, and department via a modal form
- **Duplicate Registration Prevention** — Blocks re-registration by the same email for an event
- **Live Participant Count** — Each event card shows the current number of registered participants
- **Form Validation** — Client-side validation for all forms including email format and future-date checks
- **Persistent Storage** — Events and registrations are saved to `localStorage` and survive page refreshes
- **Responsive Design** — Fully mobile-friendly layout using CSS Grid and media queries

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Flexbox, Grid, Media Queries) |
| Logic | Vanilla JavaScript (ES6 Classes) |
| Storage | Browser `localStorage` |

No frameworks, no build tools, no dependencies.

---

## 📁 Project Structure

```
college-event-management/
│
├── index.html      # Main HTML structure and modal
├── style.css       # All styling including responsive breakpoints
├── script.js       # EventManager class — all app logic
└── background.jpg  # Background image for the body (optional)
```

---

## 🚀 Getting Started

Since this is a pure front-end project, no installation or build step is required.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/college-event-management.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd college-event-management
   ```

3. **Open in a browser**

   Simply open `index.html` in any modern browser:
   ```bash
   open index.html         # macOS
   start index.html        # Windows
   xdg-open index.html     # Linux
   ```

   Or use a local development server for the best experience:
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   ```

> **Note:** The app uses `localStorage`, so data is stored per-browser and cleared if browser storage is reset.

---

## 📖 Usage

### Viewing Events
- The events grid is shown by default on page load.
- Use the **category dropdown** or **date picker** at the top to filter events.

### Creating an Event
1. Click **"Create Event"** in the navigation bar.
2. Fill in the event name, date, time, category, location, and description.
3. Click **"Create Event"** — the event will appear immediately in the events list.

> Events with a past date will be rejected by form validation.

### Registering for an Event
1. Click the **"Register"** button on any event card.
2. Fill in your name, email address, and department in the modal.
3. Click **"Register"** — the participant count on the card will update.

> Each email address can only be registered once per event.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please keep code changes consistent with the existing vanilla JS / no-framework approach.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

