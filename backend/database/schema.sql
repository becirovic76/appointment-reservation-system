-- Appointment Reservation System - Database Schema
-- SQLite implementation for university course project

CREATE TABLE IF NOT EXISTS Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    FullName TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Role TEXT NOT NULL CHECK (Role IN ('User', 'Administrator'))
);

CREATE TABLE IF NOT EXISTS Services (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL,
    Duration INTEGER NOT NULL -- duration in minutes
);

CREATE TABLE IF NOT EXISTS AppointmentSlots (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Date TEXT NOT NULL,           -- ISO date YYYY-MM-DD
    StartTime TEXT NOT NULL,      -- HH:mm
    EndTime TEXT NOT NULL,        -- HH:mm
    ServiceId INTEGER NOT NULL,
    IsAvailable INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (ServiceId) REFERENCES Services(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Reservations (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    SlotId INTEGER NOT NULL,
    ReservationDate TEXT NOT NULL DEFAULT (datetime('now')),
    Status TEXT NOT NULL DEFAULT 'Active' CHECK (Status IN ('Active', 'Cancelled')),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (SlotId) REFERENCES AppointmentSlots(Id) ON DELETE CASCADE,
    UNIQUE (UserId, SlotId, Status) -- prevents duplicate active reservations per user per slot
);

CREATE INDEX IF NOT EXISTS idx_slots_service ON AppointmentSlots(ServiceId);
CREATE INDEX IF NOT EXISTS idx_slots_date ON AppointmentSlots(Date);
CREATE INDEX IF NOT EXISTS idx_reservations_user ON Reservations(UserId);
