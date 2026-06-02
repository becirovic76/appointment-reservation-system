# Use Case Descriptions — Appointment Reservation System

## UC-01 Register User
| Field | Description |
|-------|-------------|
| **Actor** | Guest (unauthenticated visitor) |
| **Precondition** | Email is not already registered |
| **Main Flow** | 1. User opens registration form → 2. Enters full name, email, password → 3. System validates input → 4. System hashes password and saves user → 5. User is redirected to dashboard |
| **Alternate Flow** | 3a. Email already exists → System displays error |
| **Postcondition** | New user account exists with role "User" |

## UC-02 Login
| Field | Description |
|-------|-------------|
| **Actor** | Guest / User / Administrator |
| **Precondition** | User account exists |
| **Main Flow** | 1. User enters email and password → 2. System validates credentials → 3. System issues JWT → 4. User accesses authenticated features |
| **Alternate Flow** | 2a. Invalid credentials → Error message displayed |
| **Postcondition** | User session is active (JWT stored client-side) |

## UC-03 Logout
| Field | Description |
|-------|-------------|
| **Actor** | Authenticated User |
| **Main Flow** | 1. User clicks Logout → 2. Client removes JWT → 3. User sees login screen |
| **Postcondition** | Session terminated on client |

## UC-04 View Services
| Field | Description |
|-------|-------------|
| **Actor** | User, Administrator |
| **Main Flow** | 1. User navigates to Services → 2. System displays all services with name, description, duration |
| **Postcondition** | Service list displayed |

## UC-05 Reserve Appointment
| Field | Description |
|-------|-------------|
| **Actor** | User |
| **Precondition** | User is logged in; slot is available and in the future |
| **Main Flow** | 1. User views available slots → 2. Clicks Reserve → 3. System validates rules → 4. Reservation created, slot marked unavailable |
| **Alternate Flow** | 3a. Slot occupied → Error; 3b. Past date → Error; 3c. Duplicate reservation → Error |
| **Postcondition** | Active reservation exists; slot IsAvailable = false |

## UC-06 Cancel Reservation
| Field | Description |
|-------|-------------|
| **Actor** | User |
| **Precondition** | User owns an active reservation |
| **Main Flow** | 1. User opens reservation history → 2. Clicks Cancel → 3. Status set to Cancelled → 4. Slot becomes available again |
| **Postcondition** | Reservation cancelled; slot freed |

## UC-07 Manage Services (Admin)
| Field | Description |
|-------|-------------|
| **Actor** | Administrator |
| **Main Flow** | Admin creates/edits/deletes services via admin UI and API |
| **Postcondition** | Service catalog updated |

## UC-08 Manage Slots (Admin)
| Field | Description |
|-------|-------------|
| **Actor** | Administrator |
| **Main Flow** | Admin creates slots with date, time range, and linked service; can delete slots |
| **Postcondition** | Appointment slots available for booking |

## UC-09 Manage Users (Admin)
| Field | Description |
|-------|-------------|
| **Actor** | Administrator |
| **Main Flow** | Admin views all users, changes roles, deletes users (except self) |
| **Postcondition** | User records updated |

## UC-10 View All Reservations (Admin)
| Field | Description |
|-------|-------------|
| **Actor** | Administrator |
| **Main Flow** | Admin views table of all reservations with user and service details |
| **Postcondition** | Full reservation overview displayed |
