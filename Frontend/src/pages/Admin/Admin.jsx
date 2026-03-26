import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";
import { 
  FaMusic, 
  FaGuitar, 
  FaDrum, 
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Aktív menüpont
  const [activeTab, setActiveTab] = useState('events');

  // Adatok (később API-ról jönnek)
  const [events, setEvents] = useState([
    { id: 1, title: 'Nyílt nap a zeneiskolában', date: '2024.03.15', category: 'nyiltnap', featured: true },
    { id: 2, title: 'Tavaszi hangverseny', date: '2024.04.20', category: 'koncert', featured: true },
    { id: 3, title: 'Gitár mesterkurzus', date: '2024.05.05', category: 'mesterkurzus', featured: true },
    { id: 4, title: 'Növendék hangverseny', date: '2024.06.10', category: 'koncert', featured: false },
    { id: 5, title: 'Zenei tábor', date: '2024.07.15-19', category: 'tabor', featured: false },
    { id: 6, title: 'Őszi fesztivál', date: '2024.10.12', category: 'fesztival', featured: true }
  ]);

  const [instruments, setInstruments] = useState([
    { id: 1, name: 'Akusztikus zongora', category: 'Billentyűs', teacher: 'Kovács Anna', status: 'available' },
    { id: 2, name: 'Digitális zongora', category: 'Billentyűs', teacher: 'Kovács Anna', status: 'rented' },
    { id: 3, name: 'Akusztikus gitár', category: 'Gitár', teacher: 'Nagy Péter', status: 'available' },
    { id: 4, name: 'Elektromos gitár', category: 'Gitár', teacher: 'Nagy Péter', status: 'maintenance' },
    { id: 5, name: 'Hegedű', category: 'Vonós', teacher: 'Szabó Márta', status: 'available' },
    { id: 6, name: 'Cselló', category: 'Vonós', teacher: 'Szabó Márta', status: 'rented' }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Kovács Anna', instrument: 'Zongora', experience: '15 év', rating: 5 },
    { id: 2, name: 'Nagy Péter', instrument: 'Gitár', experience: '12 év', rating: 5 },
    { id: 3, name: 'Szabó Márta', instrument: 'Hegedű', experience: '18 év', rating: 5 },
    { id: 4, name: 'Takács Gábor', instrument: 'Dob', experience: '10 év', rating: 4 },
    { id: 5, name: 'Kiss Éva', instrument: 'Fuvola', experience: '14 év', rating: 5 },
    { id: 6, name: 'Molnár Dávid', instrument: 'Ének', experience: '9 év', rating: 4 }
  ]);

  const [applications, setApplications] = useState([
    { id: 1, name: 'Kiss Péter', email: 'kiss.peter@email.hu', instrument: 'Gitár', date: '2024.03.10', status: 'new' },
    { id: 2, name: 'Nagy Anna', email: 'nagy.anna@email.hu', instrument: 'Zongora', date: '2024.03.12', status: 'contacted' },
    { id: 3, name: 'Szabó János', email: 'szabo.janos@email.hu', instrument: 'Hegedű', date: '2024.03.15', status: 'accepted' }
  ]);

  // Szerkesztés állapotok
  const [editingEvent, setEditingEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Amíg ellenőrizzük a tokent, mutassuk a betöltést
  if (loading) {
    return (
      <div className="admin">
        <div className="container">
          <div className="loading">Betöltés...</div>
        </div>
      </div>
    );
  }

  // Ha nem admin, ne jelenítsük meg (a ProtectedRoute már átirányítja, de biztos ami biztos)
  if (!isAuthenticated || user?.jogosultsag !== 'admin') {
    return null;
  }

  // Admin felület - ha be van jelentkezve
  return (
    <div className="admin">
      {/* Admin Hero */}
      <section className="admin-hero">
        <div className="container">
          <div className="admin-header">
            <h1>Admin felület</h1>
            <div className="admin-user-info">
              <span>Bejelentkezve: {user?.fnev}</span>
              <span className="admin-role">Admin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Tabs */}
      <section className="admin-tabs-section">
        <div className="container">
          <div className="admin-tabs">
            <button 
              className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <FaCalendarAlt /> Események
            </button>
            <button 
              className={`admin-tab ${activeTab === 'instruments' ? 'active' : ''}`}
              onClick={() => setActiveTab('instruments')}
            >
              <FaGuitar /> Hangszerek
            </button>
            <button 
              className={`admin-tab ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              <FaUser /> Oktatók
            </button>
            <button 
              className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              <FaEnvelope /> Jelentkezések
            </button>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="admin-content-section">
        <div className="container">
          {/* Események tábla */}
          {activeTab === 'events' && (
            <div className="admin-table-container">
              <div className="admin-table-header">
                <h2>Események kezelése</h2>
                <button className="admin-add-btn" onClick={() => setShowAddForm(true)}>
                  <FaPlus /> Új esemény
                </button>
              </div>
              
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cím</th>
                    <th>Dátum</th>
                    <th>Kategória</th>
                    <th>Kiemelt</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.category}</td>
                      <td>{event.featured ? 'Igen' : 'Nem'}</td>
                      <td className="admin-actions">
                        <button className="admin-edit-btn" onClick={() => setEditingEvent(event)}>
                          <FaEdit />
                        </button>
                        <button className="admin-delete-btn">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Hangszerek tábla */}
          {activeTab === 'instruments' && (
            <div className="admin-table-container">
              <div className="admin-table-header">
                <h2>Hangszerek kezelése</h2>
                <button className="admin-add-btn">
                  <FaPlus /> Új hangszer
                </button>
              </div>
              
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Kategória</th>
                    <th>Oktató</th>
                    <th>Státusz</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {instruments.map(instrument => (
                    <tr key={instrument.id}>
                      <td>{instrument.id}</td>
                      <td>{instrument.name}</td>
                      <td>{instrument.category}</td>
                      <td>{instrument.teacher}</td>
                      <td>
                        <span className={`admin-status-badge ${instrument.status}`}>
                          {instrument.status === 'available' && 'Elérhető'}
                          {instrument.status === 'rented' && 'Kölcsönözve'}
                          {instrument.status === 'maintenance' && 'Szervízben'}
                        </span>
                      </td>
                      <td className="admin-actions">
                        <button className="admin-edit-btn">
                          <FaEdit />
                        </button>
                        <button className="admin-delete-btn">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Oktatók tábla */}
          {activeTab === 'teachers' && (
            <div className="admin-table-container">
              <div className="admin-table-header">
                <h2>Oktatók kezelése</h2>
                <button className="admin-add-btn">
                  <FaPlus /> Új oktató
                </button>
              </div>
              
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Hangszer</th>
                    <th>Tapasztalat</th>
                    <th>Értékelés</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>{teacher.id}</td>
                      <td>{teacher.name}</td>
                      <td>{teacher.instrument}</td>
                      <td>{teacher.experience}</td>
                      <td>{teacher.rating}/5</td>
                      <td className="admin-actions">
                        <button className="admin-edit-btn">
                          <FaEdit />
                        </button>
                        <button className="admin-delete-btn">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Jelentkezések tábla */}
          {activeTab === 'applications' && (
            <div className="admin-table-container">
              <div className="admin-table-header">
                <h2>Jelentkezések kezelése</h2>
              </div>
              
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Email</th>
                    <th>Hangszer</th>
                    <th>Dátum</th>
                    <th>Státusz</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.instrument}</td>
                      <td>{app.date}</td>
                      <td>
                        <span className={`admin-status-badge ${app.status}`}>
                          {app.status === 'new' && 'Új'}
                          {app.status === 'contacted' && 'Felvettük a kapcsolatot'}
                          {app.status === 'accepted' && 'Elfogadva'}
                        </span>
                      </td>
                      <td className="admin-actions">
                        <button className="admin-edit-btn">
                          <FaEdit />
                        </button>
                        <button className="admin-delete-btn">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Szerkesztő modal */}
      {editingEvent && (
        <div className="admin-modal-overlay" onClick={() => setEditingEvent(null)}>
          <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Esemény szerkesztése</h3>
            <form>
              <div className="admin-modal-form-group">
                <label>Cím</label>
                <input type="text" value={editingEvent.title} />
              </div>
              <div className="admin-modal-form-group">
                <label>Dátum</label>
                <input type="text" value={editingEvent.date} />
              </div>
              <div className="admin-modal-form-group">
                <label>Kategória</label>
                <select value={editingEvent.category}>
                  <option value="koncert">Koncert</option>
                  <option value="nyiltnap">Nyílt nap</option>
                  <option value="mesterkurzus">Mesterkurzus</option>
                  <option value="tabor">Tábor</option>
                  <option value="fesztival">Fesztivál</option>
                </select>
              </div>
              <div className="admin-modal-checkbox">
                <label>
                  <input type="checkbox" checked={editingEvent.featured} />
                  Kiemelt esemény
                </label>
              </div>
              <div className="admin-modal-actions">
                <button type="submit" className="admin-save-btn">
                  <FaSave /> Mentés
                </button>
                <button type="button" className="admin-cancel-btn" onClick={() => setEditingEvent(null)}>
                  <FaTimes /> Mégse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;