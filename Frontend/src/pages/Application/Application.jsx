import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaMusic,
    FaGuitar,
    FaDrum,
    FaInfoCircle,
    FaGraduationCap
} from 'react-icons/fa';
import './Application.css';

// Tanárok képei - importáljuk őket
import kovacsAnna from '../../assets/teachers/kovacs_anna.jpg';
import nagyPeter from '../../assets/teachers/nagy_peter.jpg';
import szaboMarta from '../../assets/teachers/szabo_marta.jpg';
import takacsGabor from '../../assets/teachers/takacs_gabor.jpg';
import kissEva from '../../assets/teachers/kiss_eva.jpg';
import molnarDavid from '../../assets/teachers/molnar_david.jpg';

const Application = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        instrument: '',
        experience: 'beginner',
        hasOwnInstrument: 'no',
        message: '',
        acceptTerms: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(true);

    // Képek mapping ID alapján
    const teacherImages = {
        1: kovacsAnna,
        2: nagyPeter,
        3: szaboMarta,
        4: takacsGabor,
        5: kissEva,
        6: molnarDavid
    };

    // Tanárok lekérése az adatbázisból
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teachers');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Hiba a tanárok lekérésekor:', error);
            } finally {
                setLoadingTeachers(false);
            }
        };

        fetchTeachers();
    }, []);

    const instruments = [
        { value: 'piano', label: 'Zongora', icon: <FaMusic /> },
        { value: 'guitar', label: 'Gitár', icon: <FaGuitar /> },
        { value: 'violin', label: 'Hegedű', icon: <FaMusic /> },
        { value: 'flute', label: 'Fuvola', icon: <FaMusic /> },
        { value: 'drums', label: 'Dob', icon: <FaDrum /> },
        { value: 'voice', label: 'Ének', icon: <FaMusic /> },
        { value: 'other', label: 'Egyéb', icon: <FaMusic /> }
    ];

    const experienceLevels = [
        { value: 'beginner', label: 'Kezdő' },
        { value: 'intermediate', label: 'Haladó' },
        { value: 'advanced', label: 'Mester szint' }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    birthDate: formData.birthDate,
                    instrument: formData.instrument,
                    level: formData.experience,
                    ownInstrument: formData.hasOwnInstrument,
                    message: formData.message
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Sikeres jelentkezés:', data);
                setIsSubmitted(true);

                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        birthDate: '',
                        instrument: '',
                        experience: 'beginner',
                        hasOwnInstrument: 'no',
                        message: '',
                        acceptTerms: false
                    });
                }, 5000);
            } else {
                setError(data.error || 'Hiba történt a jelentkezés küldése során');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Hálózati hiba:', error);
            setError('Nem sikerült csatlakozni a szerverhez. Ellenőrizd, hogy fut-e a backend!');
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="application">
                <div className="container">
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Köszönjük a jelentkezést!</h2>
                        <p>Sikeresen elküldted a jelentkezésed. Hamarosan felvesszük veled a kapcsolatot.</p>
                        <Link to="/" className="btn btn-primary">Vissza a kezdőlapra</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="application">
            {/* Hero szekció */}
            <section className="application-hero">
                <div className="container">
                    <h1>Jelentkezés a Harmónia Zeneiskolába</h1>
                    <p className="hero-description">
                        Töltsd ki az alábbi űrlapot, és csatlakozz zenei közösségünkhöz!
                        Tanáraink hamarosan felveszik veled a kapcsolatot a részletek egyeztetéséhez.
                    </p>
                </div>
            </section>

            {/* Tanáraink szekció - adatbázisból */}
            <section className="teachers-section">
                <div className="container">
                    <h2 className="section-title">Oktatóink</h2>
                    <p className="section-subtitle">Ismerd meg leendő tanárainkat!</p>

                    {loadingTeachers ? (
                        <div className="loading">Betöltés...</div>
                    ) : (
                        <div className="teachers-grid">
                            {teachers.map(teacher => (
                                <div key={teacher.id} className="teacher-card">
                                    <div className="teacher-image">
                                        <img
                                            src={teacherImages[teacher.id]}
                                            alt={teacher.name}
                                            style={{
                                                objectPosition: teacher.id === 2 ? 'center 5%' :
                                                    teacher.id === 6 ? 'center 30%' :
                                                    'center 30%'
                                            }}
                                        />
                                    </div>
                                    <div className="teacher-info">
                                        <h3>{teacher.name}</h3>
                                        <p className="teacher-instrument">
                                            {teacher.instruments && teacher.instruments.length > 0 
                                                ? teacher.instruments.join(', ') 
                                                : 'Zeneoktató'}
                                        </p>
                                        <div className="teacher-details">
                                            <p><FaGraduationCap /> {teacher.education || 'Zeneakadémia végzettség'}</p>
                                            <p><FaCalendarAlt /> {teacher.experience || 'Sok éves'} tapasztalat</p>
                                        </div>
                                        <p className="teacher-description">{teacher.description || 'Tapasztalt oktató, aki szenvedéllyel tanítja a zenét.'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Űrlap szekció */}
            <section className="application-form-section">
                <div className="container">
                    <div className="form-container">
                        <div className="form-info">
                            <h2>Miért érdemes hozzánk jelentkezni?</h2>
                            <ul className="info-list">
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Tapasztalt, diplomás zenetanárok</span>
                                </li>
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Egyéni és csoportos órák</span>
                                </li>
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Rugalmas időbeosztás</span>
                                </li>
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Rendszeres fellépési lehetőségek</span>
                                </li>
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Családias légkör</span>
                                </li>
                                <li>
                                    <span className="info-icon">✓</span>
                                    <span>Kiváló elhelyezkedés Budapest szívében</span>
                                </li>
                            </ul>

                            <div className="contact-info-small">
                                <h3>Kérdésed van?</h3>
                                <p><span className="contact-icon">📞</span> +36 1 234 5678</p>
                                <p><span className="contact-icon">✉️</span> info@harmoniazeneiskola.hu</p>
                                <p><span className="contact-icon">📍</span> Budapest, Jókai tér 1.</p>
                            </div>
                        </div>

                        <form className="application-form" onSubmit={handleSubmit}>
                            <h2>Jelentkezési űrlap</h2>

                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name">
                                    <FaUser className="input-icon" /> Teljes név *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Pl. Kovács János"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <FaEnvelope className="input-icon" /> Email cím *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="pelda@email.hu"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <FaPhone className="input-icon" /> Telefonszám *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+36 30 123 4567"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="birthDate">
                                        <FaCalendarAlt className="input-icon" /> Születési dátum *
                                    </label>
                                    <input
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="instrument">
                                        <FaMusic className="input-icon" /> Választott hangszer *
                                    </label>
                                    <select
                                        id="instrument"
                                        name="instrument"
                                        value={formData.instrument}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Válassz hangszert</option>
                                        {instruments.map(inst => (
                                            <option key={inst.value} value={inst.value}>
                                                {inst.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Új mező: Van saját hangszere? */}
                            <div className="form-group">
                                <label>Van saját hangszered?</label>
                                <p className="field-note">Ha nincs, iskolánkban kedvezményesen bérelhetsz hangszert.</p>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="hasOwnInstrument"
                                            value="yes"
                                            checked={formData.hasOwnInstrument === 'yes'}
                                            onChange={handleChange}
                                        />
                                        <span>Igen, van</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="hasOwnInstrument"
                                            value="no"
                                            checked={formData.hasOwnInstrument === 'no'}
                                            onChange={handleChange}
                                        />
                                        <span>Nincs, szeretnék kölcsönözni</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="hasOwnInstrument"
                                            value="maybe"
                                            checked={formData.hasOwnInstrument === 'maybe'}
                                            onChange={handleChange}
                                        />
                                        <span>Még nem tudom</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="experience">Szint / Előképzettség *</label>
                                <div className="radio-group">
                                    {experienceLevels.map(level => (
                                        <label key={level.value} className="radio-label">
                                            <input
                                                type="radio"
                                                name="experience"
                                                value={level.value}
                                                checked={formData.experience === level.value}
                                                onChange={handleChange}
                                            />
                                            <span>{level.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">
                                    <FaInfoCircle className="input-icon" /> Üzenet / Megjegyzés
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Ha bármit szeretnél közölni velünk (pl. korábbi zenei tapasztalat, különleges igények, stb.)"
                                />
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>Elfogadom az <Link to="/terms">Adatvédelmi nyilatkozatot</Link> és hozzájárulok adataim kezeléséhez. *</span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Küldés...' : 'Jelentkezés elküldése'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Application;