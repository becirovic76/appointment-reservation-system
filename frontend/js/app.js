/**
 * Main application controller.
 * Handles routing, UI rendering, and user interactions.
 */
(function () {
  const views = ['login', 'register', 'dashboard', 'services', 'slots', 'reservations', 'profile', 'admin'];

  // --- Utilities ---
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 3000);
  }

  function showView(name) {
    views.forEach((v) => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.hidden = v !== name;
    });
    document.querySelectorAll('.nav-link').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === name);
    });
  }

  function updateNav() {
    const navbar = document.getElementById('navbar');
    const loggedIn = Auth.isLoggedIn();

    navbar.hidden = !loggedIn;

    if (loggedIn) {
      document.getElementById('navUserName').textContent = Auth.user.fullName;
      const roleEl = document.getElementById('navUserRole');
      roleEl.textContent = Auth.user.role;
      roleEl.className = `role-badge ${Auth.user.role === 'User' ? 'user' : ''}`;

      document.querySelectorAll('.admin-only').forEach((el) => {
        el.hidden = !Auth.isAdmin();
      });
    }
  }

  // --- Auth handlers ---
  document.getElementById('showRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    showView('register');
  });

  document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    showView('login');
  });

  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('loginError');
    errEl.hidden = true;
    try {
      const res = await API.login({
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
      });
      Auth.save(res.data.token, res.data.user);
      updateNav();
      showView('dashboard');
      loadDashboard();
      showToast('Welcome back!');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.hidden = false;
    }
  });

  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = document.getElementById('registerError');
    errEl.hidden = true;
    try {
      await API.register({
        fullName: document.getElementById('regFullName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
      });
      const loginRes = await API.login({
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
      });
      Auth.save(loginRes.data.token, loginRes.data.user);
      updateNav();
      showView('dashboard');
      loadDashboard();
      showToast('Account created successfully!');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.hidden = false;
    }
  });

  document.getElementById('btnLogout')?.addEventListener('click', async () => {
    try { await API.logout(); } catch { /* ignore */ }
    Auth.clear();
    updateNav();
    showView('login');
    showToast('Logged out');
  });

  // --- Navigation ---
  document.querySelectorAll('.nav-link').forEach((btn) => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.view));
  });

  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.goto));
  });

  function navigateTo(view) {
    showView(view);
    const loaders = {
      dashboard: loadDashboard,
      services: loadServices,
      slots: loadSlots,
      reservations: loadReservations,
      profile: loadProfile,
      admin: loadAdmin,
    };
    loaders[view]?.();
  }

  // --- Dashboard ---
  async function loadDashboard() {
    document.getElementById('dashboardGreeting').textContent =
      `Hello, ${Auth.user.fullName}!`;

    try {
      const [services, slots, reservations] = await Promise.all([
        API.getServices(),
        API.getSlots('?available=true'),
        API.getMyReservations(),
      ]);

      const active = reservations.data.filter((r) => r.status === 'Active');

      document.getElementById('dashboardStats').innerHTML = `
        <div class="stat-card"><div class="value">${services.data.length}</div><div class="label">Services</div></div>
        <div class="stat-card"><div class="value">${slots.data.length}</div><div class="label">Available Slots</div></div>
        <div class="stat-card"><div class="value">${active.length}</div><div class="label">Active Reservations</div></div>
      `;
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // --- Services ---
  async function loadServices() {
    try {
      const res = await API.getServices();
      const list = document.getElementById('servicesList');
      list.innerHTML = res.data.map((s) => `
        <div class="service-card">
          <h3>${escapeHtml(s.name)}</h3>
          <p>${escapeHtml(s.description)}</p>
          <span class="duration">${s.duration} min</span>
        </div>
      `).join('') || '<div class="empty-state">No services available</div>';

      if (Auth.isAdmin()) {
        renderAdminServices(res.data);
        populateServiceSelects(res.data);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function renderAdminServices(services) {
    document.getElementById('adminServicesTable').innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Duration</th><th>Actions</th></tr></thead>
        <tbody>
          ${services.map((s) => `
            <tr>
              <td>${s.id}</td>
              <td>${escapeHtml(s.name)}</td>
              <td>${s.duration} min</td>
              <td><button class="btn btn-danger btn-sm" onclick="deleteService(${s.id})">Delete</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  window.deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await API.deleteService(id);
      showToast('Service deleted');
      loadServices();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  document.getElementById('serviceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await API.createService({
        name: document.getElementById('svcName').value,
        description: document.getElementById('svcDesc').value,
        duration: Number(document.getElementById('svcDuration').value),
      });
      e.target.reset();
      showToast('Service created');
      loadServices();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // --- Slots ---
  async function loadSlots() {
    try {
      const servicesRes = await API.getServices();
      populateServiceSelects(servicesRes.data);

      const filterId = document.getElementById('filterService').value;
      const query = filterId ? `?serviceId=${filterId}&available=true` : '?available=true';
      const res = await API.getSlots(query);

      const list = document.getElementById('slotsList');
      list.innerHTML = res.data.map((slot) => `
        <div class="slot-card ${slot.isAvailable ? '' : 'unavailable'}">
          <h3>${escapeHtml(slot.serviceName || 'Service')}</h3>
          <div class="slot-time">${slot.date} · ${slot.startTime} – ${slot.endTime}</div>
          <p>${slot.isAvailable ? 'Available' : 'Reserved'}</p>
          ${slot.isAvailable ? `<button class="btn btn-primary btn-sm" style="margin-top:0.75rem" onclick="bookSlot(${slot.id})">Reserve</button>` : ''}
          ${Auth.isAdmin() ? `<button class="btn btn-danger btn-sm" style="margin-top:0.5rem" onclick="deleteSlot(${slot.id})">Delete</button>` : ''}
        </div>
      `).join('') || '<div class="empty-state">No available slots</div>';
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function populateServiceSelects(services) {
    const options = services.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
    const filter = document.getElementById('filterService');
    const slotSelect = document.getElementById('slotServiceId');
    if (filter) {
      const current = filter.value;
      filter.innerHTML = `<option value="">All Services</option>${options}`;
      filter.value = current;
      filter.onchange = loadSlots;
    }
    if (slotSelect) slotSelect.innerHTML = options;
  }

  window.bookSlot = async (slotId) => {
    try {
      await API.createReservation(slotId);
      showToast('Reservation created!');
      loadSlots();
      loadReservations();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  window.deleteSlot = async (id) => {
    if (!confirm('Delete this slot?')) return;
    try {
      await API.deleteSlot(id);
      showToast('Slot deleted');
      loadSlots();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  document.getElementById('btnRefreshSlots')?.addEventListener('click', loadSlots);

  document.getElementById('slotForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await API.createSlot({
        date: document.getElementById('slotDate').value,
        startTime: document.getElementById('slotStart').value,
        endTime: document.getElementById('slotEnd').value,
        serviceId: Number(document.getElementById('slotServiceId').value),
      });
      e.target.reset();
      showToast('Slot created');
      loadSlots();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // --- Reservations ---
  async function loadReservations() {
    try {
      const res = await API.getMyReservations();
      const list = document.getElementById('reservationsList');
      list.innerHTML = res.data.map((r) => `
        <div class="reservation-item">
          <div class="info">
            <h4>${escapeHtml(r.serviceName)}</h4>
            <p>${r.slotDate} · ${r.slotStartTime} – ${r.slotEndTime}</p>
            <p>Reserved: ${new Date(r.reservationDate).toLocaleString()}</p>
          </div>
          <div>
            <span class="status-${r.status.toLowerCase()}">${r.status}</span>
            ${r.status === 'Active' ? `<button class="btn btn-danger btn-sm" style="margin-left:1rem" onclick="cancelReservation(${r.id})">Cancel</button>` : ''}
          </div>
        </div>
      `).join('') || '<div class="empty-state">No reservations yet</div>';

      if (Auth.isAdmin()) {
        const all = await API.getAllReservations();
        document.getElementById('allReservationsTable').innerHTML = `
          <table>
            <thead><tr><th>User</th><th>Service</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              ${all.data.map((r) => `
                <tr>
                  <td>${escapeHtml(r.userFullName)}</td>
                  <td>${escapeHtml(r.serviceName)}</td>
                  <td>${r.slotDate} ${r.slotStartTime}</td>
                  <td class="status-${r.status.toLowerCase()}">${r.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  window.cancelReservation = async (id) => {
    if (!confirm('Cancel this reservation?')) return;
    try {
      await API.cancelReservation(id);
      showToast('Reservation cancelled');
      loadReservations();
      loadSlots();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // --- Profile ---
  async function loadProfile() {
    try {
      const res = await API.getProfile();
      const u = res.data;
      document.getElementById('profileCard').innerHTML = `
        <div class="profile-row"><span class="label">Full Name</span><span>${escapeHtml(u.fullName)}</span></div>
        <div class="profile-row"><span class="label">Email</span><span>${escapeHtml(u.email)}</span></div>
        <div class="profile-row"><span class="label">Role</span><span>${escapeHtml(u.role)}</span></div>
        <div class="profile-row"><span class="label">User ID</span><span>#${u.id}</span></div>
      `;
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // --- Admin ---
  async function loadAdmin() {
    if (!Auth.isAdmin()) return;
    try {
      const res = await API.getUsers();
      document.getElementById('usersTable').innerHTML = `
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            ${res.data.map((u) => `
              <tr>
                <td>${u.id}</td>
                <td>${escapeHtml(u.fullName)}</td>
                <td>${escapeHtml(u.email)}</td>
                <td>
                  <select onchange="updateUserRole(${u.id}, this.value)" ${u.id === Auth.user.id ? 'disabled' : ''}>
                    <option value="User" ${u.role === 'User' ? 'selected' : ''}>User</option>
                    <option value="Administrator" ${u.role === 'Administrator' ? 'selected' : ''}>Administrator</option>
                  </select>
                </td>
                <td>
                  ${u.id !== Auth.user.id ? `<button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">Delete</button>` : '-'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  window.updateUserRole = async (id, role) => {
    try {
      const users = await API.getUsers();
      const user = users.data.find((u) => u.id === id);
      await API.updateUser(id, { fullName: user.fullName, email: user.email, role });
      showToast('User role updated');
    } catch (err) {
      showToast(err.message, 'error');
      loadAdmin();
    }
  };

  window.deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await API.deleteUser(id);
      showToast('User deleted');
      loadAdmin();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Init ---
  Auth.load();
  if (Auth.isLoggedIn()) {
    updateNav();
    showView('dashboard');
    loadDashboard();
  } else {
    showView('login');
  }
})();
