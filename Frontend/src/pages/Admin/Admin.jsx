import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  FaCalendarAlt, FaGuitar, FaChalkboardTeacher, FaEnvelope,
  FaUserGraduate, FaBoxes, FaTags, FaHandHolding, FaUserLock,
  FaChalkboard, FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaSync,
  FaMoneyBillWave, FaPhone, FaMapMarkerAlt, FaClock, FaInfoCircle,
  FaEye
} from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  // Adatok állapotok
  const [events, setEvents] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState([]);
  const [teacherSkills, setTeacherSkills] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [messages, setMessages] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  // Táblák konfigurációja
  const tabs = [
    { id: 'events', name: 'Események', icon: <FaCalendarAlt /> },
    { id: 'instruments', name: 'Hangszerek', icon: <FaGuitar /> },
    { id: 'teachers', name: 'Oktatók', icon: <FaChalkboardTeacher /> },
    { id: 'applications', name: 'Jelentkezések', icon: <FaEnvelope /> },
    { id: 'students', name: 'Diákok', icon: <FaUserGraduate /> },
    { id: 'rentals', name: 'Kölcsönzések', icon: <FaHandHolding /> },
    { id: 'users', name: 'Bejelentkezések', icon: <FaUserLock /> },
    { id: 'categories', name: 'Kategóriák', icon: <FaTags /> },
    { id: 'stock', name: 'Leltár', icon: <FaBoxes /> },
    { id: 'teacherSkills', name: 'Oktatók hangszerei', icon: <FaChalkboard /> },
    { id: 'lessons', name: 'Órák', icon: <FaClock /> },
    { id: 'messages', name: 'Üzenetek', icon: <FaEnvelope /> }
  ];

  // Adatok betöltése
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const endpoints = {
        events: `${API_URL}/events`,
        instruments: `${API_URL}/instruments`,
        teachers: `${API_URL}/teachers`,
        applications: `${API_URL}/applications`,
        students: `${API_URL}/students`,
        rentals: `${API_URL}/rentals`,
        users: `${API_URL}/users`,
        categories: `${API_URL}/categories`,
        stock: `${API_URL}/stock`,
        teacherSkills: `${API_URL}/teacher-skills`,
        lessons: `${API_URL}/lessons`,
        messages: `${API_URL}/messages`
      };

      const res = await fetch(endpoints[activeTab]);
      const data = await res.json();

      const setters = {
        events: setEvents, instruments: setInstruments, teachers: setTeachers,
        applications: setApplications, students: setStudents, rentals: setRentals,
        users: setUsers, categories: setCategories, stock: setStock,
        teacherSkills: setTeacherSkills, lessons: setLessons, messages: setMessages
      };
      setters[activeTab](data);
    } catch (error) {
      console.error('Hiba az adatok betöltésekor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const getCurrentData = () => {
    const dataMap = {
      events, instruments, teachers, applications, students, rentals,
      users, categories, stock, teacherSkills, lessons, messages
    };
    return dataMap[activeTab] || [];
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd? Ez nem visszavonható!')) return;
    try {
      const res = await fetch(`${API_URL}/${activeTab}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
      else alert('Hiba történt a törlés során');
    } catch (error) { console.error('Törlési hiba:', error); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${API_URL}/${activeTab}/${editingItem.id}` : `${API_URL}/${activeTab}`;
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (res.ok) {
        setEditingItem(null); setShowAddForm(false); setFormData({}); fetchData();
      } else { const error = await res.json(); alert(`Hiba: ${error.error}`); }
    } catch (error) { console.error('Mentési hiba:', error); }
  };

  // Üzenet olvasottá jelölése
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/messages/${id}/read`, { method: 'PATCH' });
      if (res.ok) fetchData();
    } catch (error) { console.error('Hiba:', error); }
  };

  const handleEdit = (item) => { setEditingItem(item); setFormData(item); setShowAddForm(true); };
  const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
  const closeForm = () => { setShowAddForm(false); setEditingItem(null); setFormData({}); };

  if (loading || isLoading) return <div className="admin"><div className="container"><div className="admin-loading">Betöltés...</div></div></div>;
  if (!isAuthenticated || user?.jogosultsag !== 'admin') return null;

  const renderTableHeaders = () => {
    const headers = {
      events: ['ID', 'Cím', 'Dátum', 'Időpont', 'Helyszín', 'Kategória', 'Kiemelt'],
      instruments: ['ID', 'Név', 'Kategória', 'Oktató', 'Ár', 'Státusz'],
      teachers: ['ID', 'Név', 'Telefonszám', 'Email', 'Tapasztalat', 'Végzettség'],
      applications: ['ID', 'Név', 'Email', 'Telefon', 'Hangszer', 'Dátum', 'Státusz'],
      students: ['ID', 'Név', 'Telefonszám', 'Email', 'Születési dátum', 'Saját hangszer'],
      rentals: ['ID', 'Hangszer', 'Diák', 'Kezdés', 'Végzés', 'Megjegyzés', 'Státusz'],
      users: ['ID', 'Felhasználónév', 'Email', 'Jogosultság', 'Regisztráció'],
      categories: ['ID', 'Kategória név'],
      stock: ['ID', 'Ár', 'Elérhetőség'],
      teacherSkills: ['ID', 'Tanár', 'Hangszer'],
      lessons: ['ID', 'Tanár', 'Diák', 'Hangszer', 'Téma', 'Dátum', 'Idő', 'Státusz'],
      messages: ['ID', 'Név', 'Email', 'Telefon', 'Tárgy', 'Üzenet', 'Státusz', 'Dátum']
    };
    return headers[activeTab]?.map(header => <th key={header}>{header}</th>) || null;
  };

  const renderTableRow = (item) => {
    const getStatusText = (status) => {
      const map = {
        'new': 'Új', 'contacted': 'Felvettük', 'accepted': 'Elfogadva', 'rejected': 'Elutasítva',
        'available': 'Elérhető', 'rented': 'Kölcsönözve', 'maintenance': 'Szervízben',
        'aktiv': 'Aktív', 'tervezett': 'Tervezett', 'megtartva': 'Megtartva', 'lemondva': 'Lemondva',
        'olvasott': 'Olvasott'
      };
      return map[status] || status;
    };
    const getStatusClass = (status) => {
      if (status === 'olvasott') return 'status-success';
      if (['available', 'new', 'aktiv', 'tervezett'].includes(status)) return 'status-success';
      if (['rented', 'contacted', 'megtartva'].includes(status)) return 'status-warning';
      return 'status-danger';
    };

    switch (activeTab) {
      case 'events': return (<><td>{item.cim}</td><td>{item.datum}</td><td>{item.idopont}</td><td>{item.helyszin}</td><td>{item.kategoria}</td><td>{item.kiemelt ? 'Igen' : 'Nem'}</td></>);
      case 'instruments': return (<><td>{item.name}</td><td>{item.category}</td><td>{item.teacher || '-'}</td><td>{item.rentalPrice}</td><td><span className={`status-badge ${getStatusClass(item.status)}`}>{getStatusText(item.status)}</span></td></>);
      case 'teachers': return (<><td>{item.name}</td><td>{item.phone || '-'}</td><td>{item.email}</td><td>{item.experience || '-'}</td><td>{item.education || '-'}</td></>);
      case 'applications': return (<><td>{item.nev}</td><td>{item.email}</td><td>{item.telefon || '-'}</td><td>{item.hangszer || '-'}</td><td>{new Date(item.letrehozas).toLocaleDateString()}</td><td><span className={`status-badge ${getStatusClass(item.statusz)}`}>{getStatusText(item.statusz)}</span></td></>);
      case 'students': return (<><td>{item.nev}</td><td>{item.telefonsz}</td><td>{item.email}</td><td>{item.szulDatum ? new Date(item.szulDatum).toLocaleDateString() : '-'}</td><td>{item.sajatHangszer || '-'}</td></>);
      case 'rentals': return (<><td>{item.hangszerNev}</td><td>{item.diakNev}</td><td>{new Date(item.kolcsKezd).toLocaleDateString()}</td><td>{new Date(item.kolcsVeg).toLocaleDateString()}</td><td>{item.megjegyzes || '-'}</td><td><span className={`status-badge ${getStatusClass(item.statusz)}`}>{getStatusText(item.statusz)}</span></td></>);
      case 'users': return (<><td>{item.fnev}</td><td>{item.email}</td><td><span className={`user-role-badge ${item.jogosultsag}`}>{item.jogosultsag === 'admin' ? 'Admin' : item.jogosultsag === 'tanar' ? 'Tanár' : 'Diák'}</span></td><td>{new Date(item.created_at).toLocaleDateString()}</td></>);
      case 'categories': return (<><td>{item.katNev}</td></>);
      case 'stock': return (<><td>{item.ar} Ft</td><td>{item.elerhetoseg ? 'Elérhető' : 'Nem elérhető'}</td></>);
      case 'teacherSkills': return (<><td>{item.tanarNev}</td><td>{item.hangszerNev}</td></>);
      case 'lessons': return (<><td>{item.tanarNev}</td><td>{item.diakNev}</td><td>{item.hangszerNev}</td><td>{item.tema}</td><td>{new Date(item.datum).toLocaleDateString()}</td><td>{item.ido}</td><td><span className={`status-badge ${getStatusClass(item.statusz)}`}>{getStatusText(item.statusz)}</span></td></>);
      case 'messages': return (<><td>{item.nev}</td><td>{item.email}</td><td>{item.telefon || '-'}</td><td>{item.targy || '-'}</td><td className="message-preview">{item.uzenet?.substring(0, 50)}...</td><td><span className={`status-badge ${getStatusClass(item.statusz)}`}>{getStatusText(item.statusz)}</span></td><td>{new Date(item.letrehozas).toLocaleString()}</td></>);
      default: return null;
    }
  };

  const renderFormFields = () => {
    const fields = {
      events: () => (<><div className="admin-modal-form-group"><label>Cím *</label><input type="text" name="cim" value={formData.cim || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Dátum *</label><input type="date" name="datum" value={formData.datum || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Időpont *</label><input type="text" name="idopont" value={formData.idopont || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Helyszín *</label><input type="text" name="helyszin" value={formData.helyszin || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Rövid leírás</label><textarea name="leiras" value={formData.leiras || ''} onChange={handleChange} rows="3" /></div><div className="admin-modal-form-group"><label>Hosszú leírás</label><textarea name="hosszuleiras" value={formData.hosszuleiras || ''} onChange={handleChange} rows="5" /></div><div className="admin-modal-form-group"><label>Kategória</label><select name="kategoria" value={formData.kategoria || ''} onChange={handleChange}><option value="koncert">Koncert</option><option value="nyiltnap">Nyílt nap</option><option value="mesterkurzus">Mesterkurzus</option><option value="tabor">Tábor</option><option value="fesztival">Fesztivál</option></select></div><div className="admin-modal-checkbox"><label><input type="checkbox" name="kiemelt" checked={formData.kiemelt || false} onChange={handleChange} /> Kiemelt esemény</label></div></>),
      instruments: () => (<><div className="admin-modal-form-group"><label>Hangszer neve *</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Kategória *</label><input type="text" name="category" value={formData.category || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Oktató</label><input type="text" name="teacher" value={formData.teacher || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Ár (Ft/hó)</label><input type="text" name="rentalPrice" value={formData.rentalPrice || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Státusz</label><select name="status" value={formData.status || 'available'} onChange={handleChange}><option value="available">Elérhető</option><option value="rented">Kölcsönözve</option><option value="maintenance">Szervízben</option></select></div></>),
      teachers: () => (<><div className="admin-modal-form-group"><label>Név *</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Telefonszám</label><input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Email *</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Tapasztalat</label><input type="text" name="experience" value={formData.experience || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Végzettség</label><input type="text" name="education" value={formData.education || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Leírás</label><textarea name="description" value={formData.description || ''} onChange={handleChange} rows="4" /></div></>),
      applications: () => (<><div className="admin-modal-form-group"><label>Név *</label><input type="text" name="nev" value={formData.nev || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Email *</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Telefonszám</label><input type="text" name="telefon" value={formData.telefon || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Hangszer</label><input type="text" name="hangszer" value={formData.hangszer || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Üzenet</label><textarea name="uzenet" value={formData.uzenet || ''} onChange={handleChange} rows="3" /></div><div className="admin-modal-form-group"><label>Státusz</label><select name="statusz" value={formData.statusz || 'new'} onChange={handleChange}><option value="new">Új</option><option value="contacted">Felvettük a kapcsolatot</option><option value="accepted">Elfogadva</option><option value="rejected">Elutasítva</option></select></div></>),
      students: () => (<><div className="admin-modal-form-group"><label>Név *</label><input type="text" name="nev" value={formData.nev || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Telefonszám</label><input type="text" name="telefonsz" value={formData.telefonsz || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Születési dátum</label><input type="date" name="szulDatum" value={formData.szulDatum || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Saját hangszer</label><input type="text" name="sajatHangszer" value={formData.sajatHangszer || ''} onChange={handleChange} /></div></>),
      rentals: () => (<><div className="admin-modal-form-group"><label>Hangszer ID</label><input type="number" name="hangszerId" value={formData.hangszerId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Diák ID</label><input type="number" name="diakId" value={formData.diakId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Végzés dátuma</label><input type="date" name="kolcsVeg" value={formData.kolcsVeg || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Megjegyzés</label><textarea name="megjegyzes" value={formData.megjegyzes || ''} onChange={handleChange} rows="3" /></div><div className="admin-modal-form-group"><label>Státusz</label><select name="statusz" value={formData.statusz || 'aktiv'} onChange={handleChange}><option value="aktiv">Aktív</option><option value="lezart">Lezárt</option></select></div></>),
      users: () => (<><div className="admin-modal-form-group"><label>Felhasználónév *</label><input type="text" name="fnev" value={formData.fnev || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Email *</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} required /></div><div className="admin-modal-form-group"><label>Jelszó {editingItem ? '(üresen hagyva nem változik)' : '*'}</label><input type="password" name="jelszo" value={formData.jelszo || ''} onChange={handleChange} required={!editingItem} /></div><div className="admin-modal-form-group"><label>Jogosultság</label><select name="jogosultsag" value={formData.jogosultsag || 'diak'} onChange={handleChange}><option value="admin">Admin</option><option value="tanar">Tanár</option><option value="diak">Diák</option></select></div></>),
      categories: () => (<><div className="admin-modal-form-group"><label>Kategória név *</label><input type="text" name="katNev" value={formData.katNev || ''} onChange={handleChange} required /></div></>),
      stock: () => (<><div className="admin-modal-form-group"><label>Ár (Ft) *</label><input type="number" name="ar" value={formData.ar || ''} onChange={handleChange} required /></div><div className="admin-modal-checkbox"><label><input type="checkbox" name="elerhetoseg" checked={formData.elerhetoseg !== 0} onChange={(e) => setFormData(prev => ({ ...prev, elerhetoseg: e.target.checked ? 1 : 0 }))} /> Elérhető</label></div></>),
      teacherSkills: () => (<><div className="admin-modal-form-group"><label>Tanár ID</label><input type="number" name="tanarId" value={formData.tanarId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Hangszer ID</label><input type="number" name="hangszerId" value={formData.hangszerId || ''} onChange={handleChange} /></div></>),
      lessons: () => (<><div className="admin-modal-form-group"><label>Tanár ID</label><input type="number" name="tanarId" value={formData.tanarId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Diák ID</label><input type="number" name="diakId" value={formData.diakId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Hangszer ID</label><input type="number" name="hangszerId" value={formData.hangszerId || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Téma</label><input type="text" name="tema" value={formData.tema || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Dátum</label><input type="date" name="ora_datum" value={formData.ora_datum || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Időpont</label><input type="time" name="ora_ido" value={formData.ora_ido || ''} onChange={handleChange} /></div><div className="admin-modal-form-group"><label>Státusz</label><select name="statusz" value={formData.statusz || 'tervezett'} onChange={handleChange}><option value="tervezett">Tervezett</option><option value="megtartva">Megtartva</option><option value="lemondva">Lemondva</option></select></div></>),
      messages: () => (<>
        <div className="admin-modal-form-group"><label>Név</label><input type="text" name="nev" value={formData.nev || ''} onChange={handleChange} readOnly /></div>
        <div className="admin-modal-form-group"><label>Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} readOnly /></div>
        <div className="admin-modal-form-group"><label>Telefonszám</label><input type="text" name="telefon" value={formData.telefon || ''} onChange={handleChange} readOnly /></div>
        <div className="admin-modal-form-group"><label>Tárgy</label><input type="text" name="targy" value={formData.targy || ''} onChange={handleChange} readOnly /></div>
        <div className="admin-modal-form-group"><label>Üzenet</label><textarea name="uzenet" value={formData.uzenet || ''} onChange={handleChange} rows="6" readOnly /></div>
        <div className="admin-modal-form-group"><label>Státusz</label><select name="statusz" value={formData.statusz || 'uj'} onChange={handleChange}><option value="uj">Új</option><option value="olvasott">Olvasott</option></select></div>
      </>)
    };
    return fields[activeTab]?.() || null;
  };

  // Extra gombok az üzenetekhez
  const renderExtraActions = (item) => {
    if (activeTab === 'messages' && item.statusz !== 'olvasott') {
      return (
        <button className="admin-read-btn" onClick={() => markAsRead(item.id)} title="Olvasottá jelölés">
          <FaEye />
        </button>
      );
    }
    return null;
  };

  return (
    <div className="admin">
      <section className="admin-hero">
        <div className="container">
          <div className="admin-header">
            <h1>Admin felület</h1>
            <div className="admin-user-info">
              <span>Bejelentkezve: {user?.fnev}</span>
              <span className="admin-role">Admin</span>
              <button className="admin-refresh-btn" onClick={fetchData}><FaSync /> Frissítés</button>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-tabs-section">
        <div className="container">
          <div className="admin-tabs">
            {tabs.map(tab => (
              <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-content-section">
        <div className="container">
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h2>{tabs.find(t => t.id === activeTab)?.name} kezelése</h2>
              {activeTab !== 'messages' && (
                <button className="admin-add-btn" onClick={() => setShowAddForm(true)}><FaPlus /> Új hozzáadása</button>
              )}
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead><tr>{renderTableHeaders()}<th>Műveletek</th></tr></thead>
                <tbody>
                  {getCurrentData().map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      {renderTableRow(item)}
                      <td className="admin-actions">
                        {renderExtraActions(item)}
                        <button className="admin-edit-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
                        <button className="admin-delete-btn" onClick={() => handleDelete(item.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showAddForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingItem ? 'Szerkesztés' : 'Új elem hozzáadása'}</h3>
            <form onSubmit={handleSave}>
              {renderFormFields()}
              <div className="admin-modal-actions">
                <button type="submit" className="admin-save-btn"><FaSave /> Mentés</button>
                <button type="button" className="admin-cancel-btn" onClick={closeForm}><FaTimes /> Mégse</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;