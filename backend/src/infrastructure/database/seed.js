
require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });
const bcrypt = require('bcryptjs');
const { getDatabase } = require('./connection');

const db = getDatabase();

async function seed() {
  console.log('Seeding database...');

  const adminHash = await bcrypt.hash('admin123', 10);
  const userHash = await bcrypt.hash('user123', 10);


  db.exec(`
    DELETE FROM Reservations;
    DELETE FROM AppointmentSlots;
    DELETE FROM Services;
    DELETE FROM Users;
  `);


  db.prepare(
    `INSERT INTO Users (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)`
  ).run('System Administrator', 'admin@university.edu', adminHash, 'Administrator');

  db.prepare(
    `INSERT INTO Users (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)`
  ).run('John Student', 'john@university.edu', userHash, 'User');

  db.prepare(
    `INSERT INTO Users (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)`
  ).run('Jane Doe', 'jane@university.edu', userHash, 'User');


  const services = [
    ['Academic Advising', 'One-on-one session with academic advisor', 30],
    ['Career Counseling', 'Career path and internship guidance', 45],
    ['IT Support', 'Technical assistance for university systems', 20],
    ['Library Research Help', 'Assistance with research and databases', 30],
  ];

  const insertService = db.prepare(
    'INSERT INTO Services (Name, Description, Duration) VALUES (?, ?, ?)'
  );
  services.forEach((s) => insertService.run(...s));


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const fmt = (d) => d.toISOString().split('T')[0];

  const slots = [
    [fmt(tomorrow), '09:00', '09:30', 1],
    [fmt(tomorrow), '10:00', '10:45', 2],
    [fmt(tomorrow), '14:00', '14:20', 3],
    [fmt(dayAfter), '11:00', '11:30', 1],
    [fmt(dayAfter), '13:00', '13:30', 4],
    [fmt(dayAfter), '15:00', '15:45', 2],
  ];

  const insertSlot = db.prepare(
    'INSERT INTO AppointmentSlots (Date, StartTime, EndTime, ServiceId, IsAvailable) VALUES (?, ?, ?, ?, 1)'
  );
  slots.forEach((s) => insertSlot.run(...s));

  console.log('Seed completed.');
  console.log('Admin: admin@university.edu / admin123');
  console.log('User:  john@university.edu / user123');
}

seed().catch(console.error);
