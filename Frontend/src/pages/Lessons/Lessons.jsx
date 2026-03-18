import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaMusic,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaChalkboardTeacher
} from 'react-icons/fa';
import './Lessons.css';

const Lessons = () => {
  // Ideiglenes adatok - később jön a backendből
  const [userRole] = useState('diak'); // 'diak' vagy 'tanar' - később contextből
  const [userName] = useState('Kiss Péter'); // később contextből
  const [selectedDate, setSelectedDate] = useState('2025-04-07'); // aktuális hét
  const [viewMode, setViewMode] = useState('week'); // 'week' vagy 'list'

  // Példa órák diák nézetben
  const studentLessons = [
    {
      id: 1,
      date: '2025-04-07',
      day: 'Hétfő',
      time: '15:00 - 15:45',
      teacher: 'Kovács Anna',
      instrument: 'Zongora',
      topic: 'Skálagyakorlatok',
      status: 'confirmed',
      room: '201-es terem'
    },
    {
      id: 2,
      date: '2025-04-08',
      day: 'Kedd',
      time: '16:00 - 16:45',
      teacher: 'Nagy Péter',
      instrument: 'Gitár',
      topic: 'Akkordok és pengetéstechnika',
      status: 'confirmed',
      room: '105-ös terem'
    },
    {
      id: 3,
      date: '2025-04-09',
      day: 'Szerda',
      time: '14:00 - 14:45',
      teacher: 'Szabó Márta',
      instrument: 'Hegedű',
      topic: 'Vonótechnika fejlesztés',
      status: 'cancelled',
      room: '203-as terem'
    },
    {
      id: 4,
      date: '2025-04-10',
      day: 'Csütörtök',
      time: '17:00 - 17:45',
      teacher: 'Takács Gábor',
      instrument: 'Dob',
      topic: 'Alapritmusok gyakorlása',
      status: 'confirmed',
      room: 'Dobterem'
    },
    {
      id: 5,
      date: '2025-04-11',
      day: 'Péntek',
      time: '15:30 - 16:15',
      teacher: 'Kiss Éva',
      instrument: 'Fuvola',
      topic: 'Hangképzés',
      status: 'pending',
      room: '202-es terem'
    },
    {
      id: 6,
      date: '2025-04-14',
      day: 'Hétfő',
      time: '15:00 - 15:45',
      teacher: 'Kovács Anna',
      instrument: 'Zongora',
      topic: 'Bach: Kis prelúdium',
      status: 'confirmed',
      room: '201-es terem'
    }
  ];

  // Példa órák tanár nézetben
  const teacherLessons = [
    {
      id: 1,
      date: '2025-04-07',
      day: 'Hétfő',
      time: '15:00 - 15:45',
      student: 'Kiss Péter',
      instrument: 'Zongora',
      topic: 'Skálagyakorlatok',
      status: 'confirmed',
      room: '201-es terem',
      level: 'Kezdő'
    },
    {
      id: 2,
      date: '2025-04-07',
      day: 'Hétfő',
      time: '16:00 - 16:45',
      student: 'Nagy Anna',
      instrument: 'Zongora',
      topic: 'Etűdök gyakorlása',
      status: 'confirmed',
      room: '201-es terem',
      level: 'Haladó'
    },
    {
      id: 3,
      date: '2025-04-08',
      day: 'Kedd',
      time: '14:00 - 14:45',
      student: 'Szabó Márton',
      instrument: 'Zongora',
      topic: 'Új darab: Für Elise',
      status: 'confirmed',
      room: '201-es terem',
      level: 'Kezdő'
    },
    {
      id: 4,
      date: '2025-04-09',
      day: 'Szerda',
      time: '16:00 - 16:45',
      student: 'Tóth Gábor',
      instrument: 'Zongora',
      topic: 'Skálák és futamok',
      status: 'cancelled',
      room: '201-es terem',
      level: 'Haladó'
    },
    {
      id: 5,
      date: '2025-04-10',
      day: 'Csütörtök',
      time: '15:00 - 15:45',
      student: 'Varga Réka',
      instrument: 'Zongora',
      topic: 'Kottaolvasás gyakorlása',
      status: 'pending',
      room: '201-es terem',
      level: 'Kezdő'
    }
  ];

  const lessons = userRole === 'diak' ? studentLessons : teacherLessons;

  // Heti nézet létrehozása
  const weekDays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  const weekStart = new Date(selectedDate);
  const weekStartDate = new Date(weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1));
  
  const weekSchedule = weekDays.map((day, index) => {
    const currentDate = new Date(weekStartDate);
    currentDate.setDate(weekStartDate.getDate() + index);
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayLessons = lessons.filter(lesson => lesson.date === dateStr);
    
    return {
      day,
      date: dateStr,
      formattedDate: `${currentDate.getFullYear()}. ${currentDate.getMonth() + 1}. ${currentDate.getDate()}.`,
      lessons: dayLessons.sort((a, b) => a.time.localeCompare(b.time))
    };
  });

  // Következő órák listája
  const upcomingLessons = lessons
    .filter(lesson => lesson.date >= '2025-04-07' && lesson.status === 'confirmed')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <span className="status-badge confirmed"><FaCheckCircle /> Megerősítve</span>;
      case 'cancelled':
        return <span className="status-badge cancelled"><FaTimesCircle /> Lemondva</span>;
      case 'pending':
        return <span className="status-badge pending"><FaHourglassHalf /> Függőben</span>;
      default:
        return null;
    }
  };

  return (
    <div className="lessons">
      {/* Hero szekció */}
      <section className="lessons-hero">
        <div className="container">
          <div className="lessons-header">
            <h1>Óráim</h1>
            <p className="lessons-hero-text">
              Üdvözöllek, {userName}! Itt követheted nyomon óráid időpontjait.
            </p>
          </div>
        </div>
      </section>

      {/* Nézet választó és dátum navigáció */}
      <section className="lessons-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >
                Heti nézet
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                Lista nézet
              </button>
            </div>

            {viewMode === 'week' && (
              <div className="week-navigation">
                <button className="nav-btn" onClick={() => {
                  const prevWeek = new Date(selectedDate);
                  prevWeek.setDate(prevWeek.getDate() - 7);
                  setSelectedDate(prevWeek.toISOString().split('T')[0]);
                }}>
                  ← Előző hét
                </button>
                <span className="current-week">
                  {weekSchedule[0].formattedDate} - {weekSchedule[4].formattedDate}
                </span>
                <button className="nav-btn" onClick={() => {
                  const nextWeek = new Date(selectedDate);
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  setSelectedDate(nextWeek.toISOString().split('T')[0]);
                }}>
                  Következő hét →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Heti nézet */}
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
                        <div key={lesson.id} className={`lesson-card ${lesson.status}`}>
                          <div className="lesson-time">
                            <FaClock /> {lesson.time}
                          </div>
                          <div className="lesson-info">
                            {userRole === 'diak' ? (
                              <>
                                <p className="lesson-teacher">
                                  <FaChalkboardTeacher /> {lesson.teacher}
                                </p>
                                <p className="lesson-instrument">
                                  <FaMusic /> {lesson.instrument}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="lesson-student">
                                  <FaUser /> {lesson.student}
                                </p>
                                <p className="lesson-instrument">
                                  <FaMusic /> {lesson.instrument}
                                </p>
                                <p className="lesson-level">Szint: {lesson.level}</p>
                              </>
                            )}
                            <p className="lesson-topic">{lesson.topic}</p>
                            <p className="lesson-room">Terem: {lesson.room}</p>
                            <div className="lesson-status">
                              {getStatusBadge(lesson.status)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-lesson">
                        <p>Nincs óra</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lista nézet */}
      {viewMode === 'list' && (
        <section className="list-view">
          <div className="container">
            <h2 className="section-title">Következő órák</h2>
            <div className="lessons-list">
              {upcomingLessons.map(lesson => (
                <div key={lesson.id} className={`list-lesson-card ${lesson.status}`}>
                  <div className="list-lesson-date">
                    <div className="date-badge">
                      <FaCalendarAlt />
                      <span>{lesson.date}</span>
                    </div>
                    <div className="time-badge">
                      <FaClock />
                      <span>{lesson.time}</span>
                    </div>
                  </div>
                  <div className="list-lesson-info">
                    {userRole === 'diak' ? (
                      <>
                        <h3>{lesson.teacher} - {lesson.instrument}</h3>
                        <p className="lesson-topic">{lesson.topic}</p>
                        <p className="lesson-room">Terem: {lesson.room}</p>
                      </>
                    ) : (
                      <>
                        <h3>{lesson.student} - {lesson.instrument}</h3>
                        <p className="lesson-topic">{lesson.topic}</p>
                        <p className="lesson-level">Szint: {lesson.level}</p>
                        <p className="lesson-room">Terem: {lesson.room}</p>
                      </>
                    )}
                  </div>
                  <div className="list-lesson-status">
                    {getStatusBadge(lesson.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Információs szekció */}
      <section className="lessons-info">
        <div className="container">
          <div className="info-boxes">
            <div className="info-box">
              <FaCalendarAlt className="info-icon" />
              <h3>Órák időpontja</h3>
              <p>Az órák pontos időpontjáról emailben is értesítést küldünk.</p>
            </div>
            <div className="info-box">
              <FaChalkboardTeacher className="info-icon" />
              <h3>Lemondás</h3>
              <p>Az órákat legkésőbb 24 órával előtte lehet lemondani.</p>
            </div>
            <div className="info-box">
              <FaMusic className="info-icon" />
              <h3>Hangszer</h3>
              <p>Ne felejtsd el otthon a hangszered és a kottáid!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lessons;