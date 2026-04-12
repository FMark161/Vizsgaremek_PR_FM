import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMusic,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaChalkboardTeacher,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaSync
} from 'react-icons/fa';
import './Lessons.css';

const Lessons = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('week');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    tanarId: '',
    diakId: '',
    hangszerId: '',
    tema: '',
    ora_datum: '',
    ora_ido: '',
    statusz: 'tervezett'
  });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  // Felhasználó szerepkörének és azonosítójának meghatározása
  const getUserRoleAndId = () => {
    if (!user) return { role: null, id: null };
    if (user.jogosultsag === 'admin') return { role: 'admin', id: null };
    if (user.jogosultsag === 'tanar') return { role: 'teacher', id: 1 };
    if (user.jogosultsag === 'diak') return { role: 'student', id: 1 };
    return { role: null, id: null };
  };

  const { role, id } = getUserRoleAndId();

  // --- Adatlekérő függvények ---
  const fetchStudents = async () => {
    try {
      const studentsRes = await fetch(`${API_URL}/students`);
      const studentsData = await studentsRes.json();
      setStudents(studentsData);
    } catch (error) {
      console.error('Hiba a diákok betöltésekor:', error);
    }
  };

  const fetchInstruments = async () => {
    try {
      const instrumentsRes = await fetch(`${API_URL}/instruments`);
      const instrumentsData = await instrumentsRes.json();
      setInstruments(instrumentsData);
    } catch (error) {
      console.error('Hiba a hangszerek betöltésekor:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const teachersRes = await fetch(`${API_URL}/teachers`);
      const teachersData = await teachersRes.json();
      setTeachers(teachersData);
    } catch (error) {
      console.error('Hiba a tanárok betöltésekor:', error);
    }
  };

  // Órák lekérése (kiemelve a komponens szintjére)
  const fetchLessons = async () => {
    if (!role) return;
    setLoading(true);
    try {
      let url;
      if (role === 'admin') {
        url = `${API_URL}/lessons`;
      } else if (role === 'teacher') {
        url = `${API_URL}/lessons/teacher/${id}`;
      } else {
        url = `${API_URL}/lessons/student/${id}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      console.log('Backend válasza (órák):', data);

      const formattedData = data.map(lesson => {
        let localDate = lesson.ora_datum; // itt a helyes mezőnév
        if (localDate && localDate.includes('T')) {
          const date = new Date(localDate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          localDate = `${year}-${month}-${day}`;
        }
        return {
          ...lesson,
          datum: localDate, // egységesen datum néven tároljuk a naptárhoz
          ido: lesson.ora_ido,
          hangszerId: lesson.hangszerId
        };
      });;
      setLessons(formattedData);
    } catch (error) {
      console.error('Hiba az órák betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect-ek ---
  // Órák betöltése szerepkör változásakor
  useEffect(() => {
    if (role) fetchLessons();
  }, [role, id]);

  // Tanárok, diákok, hangszerek betöltése (admin/tanár űrlaphoz)
  useEffect(() => {
    if (role === 'admin' || role === 'teacher') {
      fetchStudents();
      fetchInstruments();
      if (role === 'admin') fetchTeachers();
    }
  }, [role]);

  // --- Űrlap kezelés ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingLesson(null);
    setFormData({
      tanarId: '',
      diakId: '',
      hangszerId: '',
      tema: '',
      ora_datum: '',
      ora_ido: '',
      statusz: 'tervezett'
    });
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      tanarId: lesson.tanarId || '',
      diakId: lesson.diakId || '',
      hangszerId: lesson.hangszerId || '',
      tema: lesson.tema || '',
      ora_datum: lesson.datum || '',
      ora_ido: lesson.ido || '',
      statusz: lesson.statusz || 'tervezett'
    });
    setShowAddForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let saveData = { ...formData };
    if (role === 'teacher') saveData.tanarId = id;

    if (!saveData.tanarId || !saveData.diakId || !saveData.hangszerId || !saveData.ora_datum || !saveData.ora_ido) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    try {
      const url = editingLesson ? `${API_URL}/lessons/${editingLesson.id}` : `${API_URL}/lessons`;
      const method = editingLesson ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      });

      const responseData = await res.json();
      console.log('Szerver válasz:', responseData);

      if (res.ok) {
        alert(editingLesson ? 'Óra sikeresen módosítva!' : 'Óra sikeresen létrehozva!');
        await fetchLessons();  // Egyszerűen újratöltjük az órákat
        closeForm();
      } else {
        alert(`Hiba: ${responseData.error || 'Ismeretlen hiba'}`);
      }
    } catch (error) {
      console.error('Mentési hiba:', error);
      alert('Hálózati hiba történt');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt az órát?')) return;
    try {
      const res = await fetch(`${API_URL}/lessons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLessons(prev => prev.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Törlési hiba:', error);
    }
  };

  // --- Segédfüggvények a megjelenítéshez ---
  const getStatusBadge = (status) => {
    switch (status) {
      case 'tervezett':
        return <span className="status-badge pending"><FaHourglassHalf /> Tervezett</span>;
      case 'megtartva':
        return <span className="status-badge confirmed"><FaCheckCircle /> Megtartva</span>;
      case 'lemondva':
        return <span className="status-badge cancelled"><FaTimesCircle /> Lemondva</span>;
      default:
        return null;
    }
  };

  const weekDays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

  const getWeekSchedule = () => {
    console.log('Lessons:', lessons.map(l => ({ id: l.id, datum: l.datum })));
    console.log('Selected date:', selectedDate);

    const selected = new Date(selectedDate);
    const dayOfWeek = selected.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(selected);
    monday.setDate(selected.getDate() - daysToMonday);

    return weekDays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayNum = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayNum}`;

      const dayLessons = lessons.filter(lesson => {
        const lessonDate = lesson.datum ? lesson.datum.split('T')[0] : lesson.datum;
        return lessonDate === dateStr;
      });

      return {
        day,
        date: dateStr,
        formattedDate: `${year}. ${month}. ${dayNum}.`,
        lessons: dayLessons.sort((a, b) => (a.ido || '').localeCompare(b.ido || ''))
      };
    });
  };

  const weekSchedule = getWeekSchedule();

  // --- UI ---
  if (authLoading || loading) {
    return <div className="lessons"><div className="container"><div className="lessons-loading">Betöltés...</div></div></div>;
  }

  if (!isAuthenticated) {
    return <div className="lessons"><div className="container"><div className="lessons-error">Kérlek jelentkezz be az óráid megtekintéséhez!</div></div></div>;
  }

  return (
    <div className="lessons">
      <section className="lessons-hero">
        <div className="container">
          <div className="lessons-header">
            <h1>Óráim</h1>
            <p className="lessons-hero-text">
              {role === 'admin' && 'Itt kezelheted az összes órát.'}
              {role === 'teacher' && `Üdvözöllek, ${user?.fnev}! Itt követheted nyomon óráid időpontjait.`}
              {role === 'student' && `Üdvözöllek, ${user?.fnev}! Itt követheted nyomon óráid időpontjait.`}
            </p>
          </div>
        </div>
      </section>

      <section className="lessons-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Heti nézet</button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>Lista nézet</button>
            </div>

            {viewMode === 'week' && (
              <div className="week-navigation">
                <button className="nav-btn" onClick={() => { /* ... */ }}>← Előző hét</button>
                <span className="current-week">{weekSchedule[0].formattedDate} - {weekSchedule[4].formattedDate}</span>
                <button className="nav-btn" onClick={() => { /* ... */ }}>Következő hét →</button>
              </div>
            )}

            {(role === 'admin' || role === 'teacher') && (
              <button className="add-lesson-btn" onClick={() => { closeForm(); setShowAddForm(true); }}>
                <FaPlus /> Új óra
              </button>
            )}
          </div>
        </div>
      </section>

      {viewMode === 'week' && (
        <section className="week-view">
          <div className="container">
            <div className="week-grid">
              {weekSchedule.map(day => (
                <div key={day.date} className="day-column">
                  <div className="day-header">
                    <h3>{day.day}</h3>
                    <p className="day-date">{day.formattedDate}</p>
                  </div>
                  <div className="day-lessons">
                    {day.lessons.length > 0 ? (
                      day.lessons.map(lesson => (
                        <div key={lesson.id} className={`lesson-card ${lesson.statusz}`}>
                          <div className="lesson-time"><FaClock /> {lesson.ido}</div>
                          <div className="lesson-info">
                            {role === 'student' && (
                              <><p className="lesson-teacher"><FaChalkboardTeacher /> {lesson.tanarNev}</p></>
                            )}
                            {role === 'teacher' && (
                              <><p className="lesson-student"><FaUser /> {lesson.diakNev}</p></>
                            )}
                            {role === 'admin' && (
                              <>
                                <p className="lesson-teacher"><FaChalkboardTeacher /> {lesson.tanarNev}</p>
                                <p className="lesson-student"><FaUser /> {lesson.diakNev}</p>
                              </>
                            )}
                            <p className="lesson-instrument"><FaMusic /> {lesson.hangszerNev}</p>
                            <p className="lesson-topic">{lesson.tema}</p>
                            <div className="lesson-status">{getStatusBadge(lesson.statusz)}</div>
                            {(role === 'admin' || role === 'teacher') && (
                              <div className="lesson-actions">
                                <button className="edit-btn" onClick={() => handleEdit(lesson)}><FaEdit /></button>
                                <button className="delete-btn" onClick={() => handleDelete(lesson.id)}><FaTrash /></button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-lesson"><p>Nincs óra</p></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {viewMode === 'list' && (
        <section className="list-view">
          <div className="container">
            <h2 className="section-title">Következő órák</h2>
            <div className="lessons-list">
              {lessons.filter(l => l.datum >= new Date().toISOString().split('T')[0]).map(lesson => (
                <div key={lesson.id} className={`list-lesson-card ${lesson.statusz}`}>
                  <div className="list-lesson-date">
                    <div className="date-badge"><FaCalendarAlt /> {lesson.datum}</div>
                    <div className="time-badge"><FaClock /> {lesson.ido}</div>
                  </div>
                  <div className="list-lesson-info">
                    {role === 'student' && <h3>{lesson.tanarNev} - {lesson.hangszerNev}</h3>}
                    {role === 'teacher' && <h3>{lesson.diakNev} - {lesson.hangszerNev}</h3>}
                    {role === 'admin' && <h3>{lesson.tanarNev} - {lesson.diakNev} ({lesson.hangszerNev})</h3>}
                    <p className="lesson-topic">{lesson.tema}</p>
                  </div>
                  <div className="list-lesson-status">{getStatusBadge(lesson.statusz)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal űrlap (változatlan) */}
      {showAddForm && (
        <div className="lessons-modal-overlay" onClick={closeForm}>
          <div className="lessons-modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingLesson ? 'Óra szerkesztése' : 'Új óra felvétele'}</h3>
            <form onSubmit={handleSave}>
              {(role === 'admin') && (
                <>
                  <div className="form-group">
                    <label>Tanár</label>
                    <select name="tanarId" value={formData.tanarId} onChange={handleChange} required>
                      <option value="">Válassz tanárt</option>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Diák</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <select name="diakId" value={formData.diakId} onChange={handleChange} required style={{ flex: 1 }}>
                        <option value="">Válassz diákot</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.nev}</option>)}
                      </select>
                      <button type="button" className="refresh-btn" onClick={fetchStudents} title="Diákok listájának frissítése">
                        <FaSync />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {(role === 'teacher') && (
                <div className="form-group">
                  <label>Diák</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select name="diakId" value={formData.diakId} onChange={handleChange} required style={{ flex: 1 }}>
                      <option value="">Válassz diákot</option>
                      {students.map(s => <option key={s.id} value={s.id}>{s.nev}</option>)}
                    </select>
                    <button type="button" className="refresh-btn" onClick={fetchStudents} title="Diákok listájának frissítése">
                      <FaSync />
                    </button>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Hangszer</label>
                <select name="hangszerId" value={formData.hangszerId} onChange={handleChange} required>
                  <option value="">Válassz hangszert</option>
                  {instruments.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Téma</label>
                <input type="text" name="tema" value={formData.tema} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Dátum</label>
                <input type="date" name="ora_datum" value={formData.ora_datum || ''} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Időpont</label>
                <input type="time" name="ora_ido" value={formData.ora_ido} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Státusz</label>
                <select name="statusz" value={formData.statusz} onChange={handleChange}>
                  <option value="tervezett">Tervezett</option>
                  <option value="megtartva">Megtartva</option>
                  <option value="lemondva">Lemondva</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn"><FaSave /> Mentés</button>
                <button type="button" className="cancel-btn" onClick={closeForm}><FaTimes /> Mégse</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;