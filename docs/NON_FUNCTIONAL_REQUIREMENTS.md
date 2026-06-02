# Non-Functional Requirements — Appointment Reservation System

## NFR-1 Performance
- API response time shall be under 500ms for standard CRUD operations on local deployment
- The system shall support at least 100 concurrent users for demonstration purposes

## NFR-2 Security
- Passwords must be hashed with bcrypt (minimum 10 salt rounds)
- API endpoints requiring authentication must validate JWT on every request
- Administrator endpoints must enforce role-based access control (RBAC)
- CORS shall be configured for the frontend origin

## NFR-3 Usability
- The user interface shall be responsive (desktop and mobile)
- Error messages shall be clear and user-friendly
- Demo credentials shall be visible on the login screen for testing

## NFR-4 Maintainability
- The codebase shall follow **Clean Architecture** with separated layers:
  - Domain (entities, enums)
  - Application (services, interfaces)
  - Infrastructure (repositories, database)
  - API (controllers, routes, middleware)
- Code shall include comments explaining business logic and layer responsibilities

## NFR-5 Reliability
- Database operations shall use SQLite with foreign key constraints enabled
- Reservation and slot availability updates shall be consistent (slot marked unavailable on reserve, available on cancel)

## NFR-6 Portability
- The system shall run on Windows, macOS, and Linux with Node.js 18+
- Setup shall require no external database server (SQLite embedded)

## NFR-7 Documentation
- Project shall include use case descriptions, user stories, UML diagrams (Mermaid), and setup instructions
