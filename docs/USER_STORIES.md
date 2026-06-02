# User Stories & Acceptance Criteria

## Authentication

### US-01 User Registration
**As a** new visitor, **I want to** register an account **so that** I can book appointments.

**Acceptance Criteria:**
- [ ] Registration form requires full name, email, and password (min 6 chars)
- [ ] Invalid email format shows validation error
- [ ] Duplicate email returns clear error message
- [ ] Successful registration logs user in automatically

### US-02 User Login
**As a** registered user, **I want to** log in **so that** I can access my appointments.

**Acceptance Criteria:**
- [ ] Valid credentials return JWT and user profile
- [ ] Invalid credentials show "Invalid email or password"
- [ ] Password is never sent or stored in plain text

### US-03 Logout
**As a** logged-in user, **I want to** log out **so that** my session ends on shared devices.

**Acceptance Criteria:**
- [ ] Logout clears token from browser storage
- [ ] User is redirected to login screen

---

## User Stories — Regular User

### US-04 Browse Services
**As a** user, **I want to** view available services **so that** I know what I can book.

**Acceptance Criteria:**
- [ ] All services display name, description, and duration
- [ ] Page loads without authentication (public endpoint)

### US-05 Book Appointment
**As a** user, **I want to** reserve an available slot **so that** I secure my appointment.

**Acceptance Criteria:**
- [ ] Only available future slots show Reserve button
- [ ] Occupied slots cannot be reserved
- [ ] Duplicate reservation for same slot is rejected
- [ ] Success shows confirmation toast

### US-06 Cancel Reservation
**As a** user, **I want to** cancel my reservation **so that** I free the slot for others.

**Acceptance Criteria:**
- [ ] Only active reservations show Cancel button
- [ ] Cancelled reservations show status "Cancelled"
- [ ] Slot becomes available after cancellation

### US-07 View History
**As a** user, **I want to** see my reservation history **so that** I track past and upcoming appointments.

**Acceptance Criteria:**
- [ ] List shows service name, date, time, status
- [ ] Only current user's reservations are shown

### US-08 View Profile
**As a** user, **I want to** view my profile **so that** I confirm my account details.

**Acceptance Criteria:**
- [ ] Profile shows full name, email, role, and user ID

---

## User Stories — Administrator

### US-09 Manage Services
**As an** administrator, **I want to** manage services **so that** users can book relevant offerings.

**Acceptance Criteria:**
- [ ] Admin can add service with name, description, duration
- [ ] Admin can delete services
- [ ] Non-admin users cannot access write endpoints (403)

### US-10 Manage Slots
**As an** administrator, **I want to** create and delete slots **so that** users have bookable times.

**Acceptance Criteria:**
- [ ] Admin can create slot with date, start/end time, service
- [ ] Past slots cannot be created
- [ ] Admin can delete slots

### US-11 View All Reservations
**As an** administrator, **I want to** see all reservations **so that** I monitor system usage.

**Acceptance Criteria:**
- [ ] Table lists user name, service, date, status for all reservations

### US-12 Manage Users
**As an** administrator, **I want to** manage user accounts **so that** I control access and roles.

**Acceptance Criteria:**
- [ ] Admin can change user role between User and Administrator
- [ ] Admin can delete users except themselves
- [ ] Role changes persist after page refresh
