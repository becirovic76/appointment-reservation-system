# API Endpoints — Appointment Reservation System

Base URL: `http://localhost:3000/api`

## Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login, returns JWT |
| POST | `/auth/logout` | Yes | Logout (client clears token) |
| GET | `/auth/me` | Yes | Current user from token |

## Services

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/services` | No | - | List all services |
| GET | `/services/:id` | No | - | Get service by ID |
| POST | `/services` | Yes | Admin | Create service |
| PUT | `/services/:id` | Yes | Admin | Update service |
| DELETE | `/services/:id` | Yes | Admin | Delete service |

## Appointment Slots

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/slots` | No | - | List slots (`?available=true`, `?serviceId=1`) |
| POST | `/slots` | Yes | Admin | Create slot |
| DELETE | `/slots/:id` | Yes | Admin | Delete slot |

## Reservations

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/reservations/my` | Yes | User | User's reservation history |
| GET | `/reservations` | Yes | Admin | All reservations |
| POST | `/reservations` | Yes | User | Create reservation `{ slotId }` |
| PUT | `/reservations/:id/cancel` | Yes | User/Admin | Cancel reservation |

## Users

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/users/profile` | Yes | User | Current user profile |
| GET | `/users` | Yes | Admin | List all users |
| PUT | `/users/:id` | Yes | Admin | Update user |
| DELETE | `/users/:id` | Yes | Admin | Delete user |

## Example Requests

### Register
```json
POST /api/auth/register
{
  "fullName": "John Doe",
  "email": "john@university.edu",
  "password": "user123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "admin@university.edu",
  "password": "admin123"
}
```

### Create Reservation
```json
POST /api/reservations
Authorization: Bearer <token>
{
  "slotId": 1
}
```
