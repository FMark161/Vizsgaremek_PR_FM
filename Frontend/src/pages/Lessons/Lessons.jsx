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
  FaTimes
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

  // Felhasználó ID-jának lekérése a bejelentkezés alapján
  const getUserRoleAndId = () => {
    if (!user) return { role: null, id: null };
    if (user.jogosultsag === 'admin') return { role: 'admin', id: null };
    if (user.jogosultsag === 'tanar') {
      // Kovács Anna ID-ja a tanarok táblában = 1
      return { role: 'teacher', id: 1 };
    }
    if (user.jogosultsag === 'diak') {
      // Kiss Péter ID-ja a diakok táblában = 1
      return { role: 'student', id: 1 };
    }
    return { role: null, id: null };
  };

  const { role, id } = getUserRoleAndId();

  // Órák betöltése
  useEffect(() => {
    const fetchLessons = async () => {
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
        console.log('Backend válasza:', data);

        // Biztosítsuk, hogy a dátum csak a dátum részt tartalmazza
        const formattedData = data.map(lesson => ({
          ...lesson,
          datum: lesson.datum ? lesson.datum.split('T')[0] : lesson.datum,
          hangszerId: lesson.hangszerId
        }));
        setLessons(formattedData);
      } catch (error) {
        console.error('Hiba az órák betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (role) fetchLessons();
  }, [role, id]);

  // Tanárok, diákok, hangszerek betöltése (admin számára az űrlaphoz)
  useEffect(() => {
    if (role === 'admin' || role === 'teacher') {
      const fetchData = async () => {
        try {
          const [studentsRes, instrumentsRes] = await Promise.all([
            fetch(`${API_URL}/students`),
            fetch(`${API_URL}/instruments`)
          ]);
          setStudents(await studentsRes.json());
          setInstruments(await instrumentsRes.json());

          if (role === 'admin') {
            const teachersRes = await fetch(`${API_URL}/teachers`);
            setTeachers(await teachersRes.json());
          }
        } catch (error) {
          console.error('Hiba:', error);
        }
      };
      fetchData();
    }
  }, [role]);

  // Új óra mentése
  const handleSave = async (e) => {
    e.preventDefault();

    let saveData = { ...formData };

    // Tanár esetén automatikusan beállítjuk a tanarId-t
    if (role === 'teacher') {
      saveData.tanarId = id;
    }

    // Ellenőrizzük, hogy a kötelező mezők ki vannak-e töltve
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
        closeForm();

        // Frissítjük a listát a szerverről
        let fetchUrl;
        if (role === 'admin') {
          fetchUrl = `${API_URL}/lessons`;
        } else if (role === 'teacher') {
          fetchUrl = `${API_URL}/lessons/teacher/${id}`;
        } else {
          fetchUrl = `${API_URL}/lessons/student/${id}`;
        }
        const fetchRes = await fetch(fetchUrl);
        const data = await fetchRes.json();
        setLessons(data);

        alert(editingLesson ? 'Óra sikeresen módosítva!' : 'Óra sikeresen létrehozva!');
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

  const handleEdit = (lesson) => {
    console.log('Szerkesztendő óra:', lesson);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Űrlap bezárása és visszaállítása
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

  // Heti nézet létrehozása
  const weekDays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
  const getWeekSchedule = () => {
    // A kiválasztott dátumból kiindulva számoljuk ki a hét hétfőjét
    const currentDate = new Date(selectedDate);
    const dayOfWeek = currentDate.getDay(); // 0=Vasárnap, 1=Hétfő, ..., 6=Szombat

    // Átalakítás: hétfő legyen a hét első napja (1=Hétfő, 0=Vasárnap)
    let daysToMonday;
    if (dayOfWeek === 0) { // Vasárnap
      daysToMonday = 6; // 6 napot kell visszamenni hétfőig
    } else {
      daysToMonday = dayOfWeek - 1; // Hétfő=0, Kedd=1, ..., Szombat=5
    }

    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - daysToMonday);
    monday.setHours(0, 0, 0, 0);

    console.log('Kiválasztott dátum:', selectedDate);
    console.log('Hétfő dátuma:', monday.toISOString().split('T')[0]);

    return weekDays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayNum = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayNum}`;

      console.log(`${day}: ${dateStr}`);

      const dayLessons = lessons.filter(l => {
        const lessonDate = l.datum ? l.datum.split('T')[0] : l.datum;
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
                <button className="nav-btn" onClick={() => {
                  const prevWeek = new Date(selectedDate);
                  prevWeek.setDate(prevWeek.getDate() - 7);
                  setSelectedDate(prevWeek.toISOString().split('T')[0]);
                }}>← Előző hét</button>
                <span className="current-week">{weekSchedule[0].formattedDate} - {weekSchedule[4].formattedDate}</span>
                <button className="nav-btn" onClick={() => {
                  const nextWeek = new Date(selectedDate);
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  setSelectedDate(nextWeek.toISOString().split('T')[0]);
                }}>Következő hét →</button>
              </div>
            )}

            {(role === 'admin' || role === 'teacher') && (
              <button className="add-lesson-btn" onClick={() => {
                closeForm();
                setShowAddForm(true);
              }}>
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

      {/* Modal űrlap */}
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
                    <select name="diakId" value={formData.diakId} onChange={handleChange} required>
                      <option value="">Válassz diákot</option>
                      {students.map(s => <option key={s.id} value={s.id}>{s.nev}</option>)}
                    </select>
                  </div>
                </>
              )}

              {(role === 'teacher') && (
                <div className="form-group">
                  <label>Diák</label>
                  <select name="diakId" value={formData.diakId} onChange={handleChange} required>
                    <option value="">Válassz diákot</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.nev}</option>)}
                  </select>
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
                <input type="date" name="ora_datum" value={formData.ora_datum} onChange={handleChange} required />
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