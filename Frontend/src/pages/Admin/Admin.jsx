import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
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
  FaSync
} from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  const API_URL = 'http://localhost:5000/api';

  // Adatok betöltése
  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'events') {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } else if (activeTab === 'instruments') {
        const res = await fetch(`${API_URL}/instruments`);
        const data = await res.json();
        setInstruments(data);
      } else if (activeTab === 'teachers') {
        const res = await fetch(`${API_URL}/teachers`);
        const data = await res.json();
        setTeachers(data);
      } else if (activeTab === 'applications') {
        const res = await fetch(`${API_URL}/applications`);
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Hiba az adatok betöltésekor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Törlés
  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt az elemet?')) return;
    
    try {
      const res = await fetch(`${API_URL}/${activeTab}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Hiba történt a törlés során');
      }
    } catch (error) {
      console.error('Törlési hiba:', error);
    }
  };

  // Mentés (új vagy szerkesztés)
  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `${API_URL}/${activeTab}/${editingItem.id}` 
      : `${API_URL}/${activeTab}`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditingItem(null);
        setShowAddForm(false);
        setFormData({});
        fetchData();
      } else {
        const error = await res.json();
        alert(`Hiba: ${error.error}`);
      }
    } catch (error) {
      console.error('Mentési hiba:', error);
    }
  };

  // Szerkesztés indítása
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(true);
  };

  // Űrlap mezők kezelése
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Űrlap bezárása
  const closeForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormData({});
  };

  if (loading || isLoading) {
    return (
      <div className="admin">
        <div className="container">
          <div className="admin-loading">Betöltés...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.jogosultsag !== 'admin') {
    return null;
  }

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
              <button className="admin-refresh-btn" onClick={fetchData}>
                <FaSync /> Frissítés
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Tabs */}
      <section className="admin-tabs-section">
        <div className="container">
          <div className="admin-tabs">
            <button className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
              <FaCalendarAlt /> Események
            </button>
            <button className={`admin-tab ${activeTab === 'instruments' ? 'active' : ''}`} onClick={() => setActiveTab('instruments')}>
              <FaGuitar /> Hangszerek
            </button>
            <button className={`admin-tab ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
              <FaUser /> Oktatók
            </button>
            <button className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
              <FaEnvelope /> Jelentkezések
            </button>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="admin-content-section">
        <div className="container">
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>
                {activeTab === 'events' && 'Események kezelése'}
                {activeTab === 'instruments' && 'Hangszerek kezelése'}
                {activeTab === 'teachers' && 'Oktatók kezelése'}
                {activeTab === 'applications' && 'Jelentkezések kezelése'}
              </h2>
              <button className="admin-add-btn" onClick={() => setShowAddForm(true)}>
                <FaPlus /> Új hozzáadása
              </button>
            </div>

            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  {activeTab === 'events' && (
                    <>
                      <th>Cím</th>
                      <th>Dátum</th>
                      <th>Időpont</th>
                      <th>Helyszín</th>
                      <th>Kategória</th>
                      <th>Kiemelt</th>
                    </>
                  )}
                  {activeTab === 'instruments' && (
                    <>
                      <th>Név</th>
                      <th>Kategória</th>
                      <th>Oktató</th>
                      <th>Ár</th>
                      <th>Státusz</th>
                    </>
                  )}
                  {activeTab === 'teachers' && (
                    <>
                      <th>Név</th>
                      <th>Hangszer</th>
                      <th>Tapasztalat</th>
                      <th>Végzettség</th>
                    </>
                  )}
                  {activeTab === 'applications' && (
                    <>
                      <th>Név</th>
                      <th>Email</th>
                      <th>Hangszer</th>
                      <th>Dátum</th>
                      <th>Státusz</th>
                    </>
                  )}
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'events' ? events : 
                  activeTab === 'instruments' ? instruments :
                  activeTab === 'teachers' ? teachers : applications).map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {activeTab === 'events' && (
                      <>
                        <td>{item.cim}</td>
                        <td>{item.datum}</td>
                        <td>{item.idopont}</td>
                        <td>{item.helyszin}</td>
                        <td>{item.kategoria}</td>
                        <td>{item.kiemelt ? 'Igen' : 'Nem'}</td>
                      </>
                    )}
                    {activeTab === 'instruments' && (
                      <>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.teacher}</td>
                        <td>{item.rentalPrice}</td>
                        <td>{item.status === 'available' ? 'Elérhető' : 
                             item.status === 'rented' ? 'Kölcsönözve' : 'Szervízben'}</td>
                      </>
                    )}
                    {activeTab === 'teachers' && (
                      <>
                        <td>{item.name}</td>
                        <td>{item.instrument}</td>
                        <td>{item.experience}</td>
                        <td>{item.education}</td>
                      </>
                    )}
                    {activeTab === 'applications' && (
                      <>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.instrument}</td>
                        <td>{item.date}</td>
                        <td>{item.status === 'new' ? 'Új' : 
                             item.status === 'contacted' ? 'Felvettük a kapcsolatot' : 
                             item.status === 'accepted' ? 'Elfogadva' : 'Elutasítva'}</td>
                      </>
                    )}
                    <td className="admin-actions">
                      <button className="admin-edit-btn" onClick={() => handleEdit(item)}>
                        <FaEdit />
                      </button>
                      <button className="admin-delete-btn" onClick={() => handleDelete(item.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add/Edit Modal */}
      {showAddForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingItem ? 'Szerkesztés' : 'Új elem hozzáadása'}</h3>
            <form onSubmit={handleSave}>
              {activeTab === 'events' && (
                <>
                  <div className="admin-modal-form-group">
                    <label>Cím *</label>
                    <input type="text" name="cim" value={formData.cim || ''} onChange={handleChange} required />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Dátum *</label>
                    <input type="date" name="datum" value={formData.datum || ''} onChange={handleChange} required />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Időpont *</label>
                    <input type="text" name="idopont" value={formData.idopont || ''} onChange={handleChange} required />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Helyszín *</label>
                    <input type="text" name="helyszin" value={formData.helyszin || ''} onChange={handleChange} required />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Rövid leírás</label>
                    <textarea name="leiras" value={formData.leiras || ''} onChange={handleChange} rows="3" />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Hosszú leírás</label>
                    <textarea name="hosszuleiras" value={formData.hosszuleiras || ''} onChange={handleChange} rows="5" />
                  </div>
                  <div className="admin-modal-form-group">
                    <label>Kategória</label>
                    <select name="kategoria" value={formData.kategoria || ''} onChange={handleChange}>
                      <option value="koncert">Koncert</option>
                      <option value="nyiltnap">Nyílt nap</option>
                      <option value="mesterkurzus">Mesterkurzus</option>
                      <option value="tabor">Tábor</option>
                      <option value="fesztival">Fesztivál</option>
                    </select>
                  </div>
                  <div className="admin-modal-checkbox">
                    <label>
                      <input type="checkbox" name="kiemelt" checked={formData.kiemelt || false} onChange={handleChange} />
                      Kiemelt esemény
                    </label>
                  </div>
                </>
              )}
              {/* További táblák űrlapmezői itt... */}
              <div className="admin-modal-actions">
                <button type="submit" className="admin-save-btn">
                  <FaSave /> Mentés
                </button>
                <button type="button" className="admin-cancel-btn" onClick={closeForm}>
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