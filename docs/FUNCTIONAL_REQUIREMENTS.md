# Functional Requirements — Appointment Reservation System

## FR-1 Authentication

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | The system shall allow new users to register with full name, email, and password | High |
| FR-1.2 | The system shall allow registered users to log in with email and password | High |
| FR-1.3 | The system shall allow authenticated users to log out | High |
| FR-1.4 | Passwords shall be stored using bcrypt hashing (never plain text) | High |
| FR-1.5 | The system shall support two roles: **User** and **Administrator** | High |
| FR-1.6 | JWT tokens shall be issued upon successful login | High |

## FR-2 User Functionality

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Users shall view all available services | High |
| FR-2.2 | Users shall view available appointment slots | High |
| FR-2.3 | Users shall create a reservation for an available slot | High |
| FR-2.4 | Users shall cancel their own active reservations | High |
| FR-2.5 | Users shall view their reservation history | High |
| FR-2.6 | Users shall access a profile page with their account details | Medium |

## FR-3 Administrator Functionality

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Administrators shall create, edit, and delete services | High |
| FR-3.2 | Administrators shall create and delete appointment slots | High |
| FR-3.3 | Administrators shall view all reservations in the system | High |
| FR-3.4 | Administrators shall manage users (view, update role, delete) | High |

## FR-4 Validation Rules

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Users cannot reserve occupied (unavailable) slots | High |
| FR-4.2 | Users cannot reserve the same slot twice (active duplicate) | High |
| FR-4.3 | Past dates/times cannot be reserved | High |
| FR-4.4 | Required fields must be validated on all forms | High |
| FR-4.5 | Email addresses must pass format validation | High |

## FR-5 Data Entities

| Entity | Attributes |
|--------|------------|
| User | Id, FullName, Email, Password, Role |
| Service | Id, Name, Description, Duration |
| AppointmentSlot | Id, Date, StartTime, EndTime, ServiceId, IsAvailable |
| Reservation | Id, UserId, SlotId, ReservationDate, Status |
