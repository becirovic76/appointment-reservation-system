# Appointment Reservation System

University course project for **Analysis and Software Design (ADS)**.

A full-stack web application that allows users to reserve appointments for university services. Built with **Clean Architecture**, Node.js/Express backend, SQLite database, and a modern **HTML/CSS/JavaScript** frontend.

---

## Project Structure

```
AppointmentReservationSystem/
├── backend/                    # Node.js API (Clean Architecture)
│   ├── database/schema.sql     # SQLite schema
│   ├── src/
│   │   ├── domain/             # Entities & enums
│   │   ├── application/        # Services & repository interfaces
│   │   ├── infrastructure/     # Repositories & database
│   │   └── api/                # Controllers, routes, middleware
│   └── package.json
├── frontend/                   # HTML, CSS, JavaScript UI
│   ├── index.html
│   ├── css/styles.css
│   └── js/                     # api.js, auth.js, app.js
└── docs/                       # Requirements, use cases, UML
```

### Clean Architecture Layers

| Layer | Responsibility |
|-------|----------------|
| **Domain** | Business entities (User, Service, Slot, Reservation) |
| **Application** | Use cases, business rules, service classes |
| **Infrastructure** | SQLite repositories, DB connection, seed data |
| **API** | HTTP controllers, JWT auth, validation, routing |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (included with Node.js)

---

## Setup & Running

### 1. Install dependencies

```bash
cd AppointmentReservationSystem/backend
npm install
```

### 2. Configure environment

```bash
copy .env.example .env
```

On macOS/Linux: `cp .env.example .env`

Edit `.env` if needed (default port `3000`).

### 3. Seed the database

```bash
npm run seed
```

This creates demo users, services, and appointment slots.

### 4. Start the server

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

### 5. Open the application

Open your browser at: **http://localhost:3000**

The backend serves both the API (`/api/*`) and the frontend static files.

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@university.edu | admin123 |
| User | john@university.edu | user123 |
| User | jane@university.edu | user123 |

---

## Features

### User
- Register / Login / Logout
- Browse services and available slots
- Book and cancel appointments
- View reservation history and profile

### Administrator
- CRUD services
- Create/delete appointment slots
- View all reservations
- Manage users (role change, delete)

### Validation
- Cannot book occupied or past slots
- No duplicate active reservations per user/slot
- Required fields and email format validation

---

## Documentation

| Document | Location |
|----------|----------|
| Functional Requirements | `docs/FUNCTIONAL_REQUIREMENTS.md` |
| Non-Functional Requirements | `docs/NON_FUNCTIONAL_REQUIREMENTS.md` |
| Use Cases | `docs/USE_CASES.md` |
| User Stories & Acceptance Criteria | `docs/USER_STORIES.md` |
| UML Diagrams (Mermaid) | `docs/UML_DIAGRAMS.md` |
| API Endpoints | `docs/API_ENDPOINTS.md` |

---

## Technology Stack

- **Backend:** Node.js, Express, better-sqlite3, bcryptjs, jsonwebtoken, express-validator
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** SQLite

---

## Course Information

**Project:** Appointment Reservation System  
**Course:** Analysis and Software Design  
**Architecture:** Clean Architecture with Repository and Service patterns
