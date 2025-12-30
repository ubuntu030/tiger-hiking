import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard' },
  { path: '/admin/activities', label: 'Activity Management' },
  { path: '/admin/announcements', label: 'Announcement Management' },
  { path: '/admin/users', label: 'User Management' },
  { path: '/admin/guides', label: 'Guide Management' },
  { path: '/admin/albums', label: 'Album Management' },
  { path: '/admin/faqs', label: 'FAQ Management' },
  { path: '/admin/reviews', label: 'Review Management' },
];

const AdminLayout = () => {
  const handleLogout = () => {
    // Logout logic will be implemented later
    console.log('Logout clicked');
  };

  const activeLinkStyle = {
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', background: '#f8f9fa', borderRight: '1px solid #dee2e6', padding: '1rem' }}>
        <h2>Tiger Hiking Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                textDecoration: 'none',
                color: '#333',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                ...(isActive ? activeLinkStyle : {}),
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            width: '100%',
            padding: '0.75rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: '2rem', background: '#fff' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

