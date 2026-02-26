import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEvent } from '../redux/actions/eventActions';
import { Calendar, MapPin, XCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Events.css';

const MyEvents = () => {
    const dispatch = useDispatch();
    const { joinedEvents } = useSelector(state => state.events);

    const handleCancel = (id) => {
        dispatch(cancelEvent(id));
    };

    return (
        <div className="events-container section-padding">
            <h1 className="section-title">Mis Eventos</h1>
            <p className="section-subtitle">Gestiona tus participaciones en los próximos eventos</p>

            {joinedEvents.length === 0 ? (
                <div className="empty-state glass-morphism">
                    <Calendar size={64} className="empty-icon" />
                    <h3>Aún no te has apuntado a ningún evento</h3>
                    <p>¡Explora nuestra sección de eventos y no te pierdas nada!</p>
                    <Link to="/eventos" className="explore-btn">
                        Ver Eventos
                    </Link>
                </div>
            ) : (
                <div className="events-grid">
                    {joinedEvents.map(event => (
                        <div key={event.id} className="event-card glass-morphism joined">
                            <div className="event-image-wrapper">
                                <img src={event.image} alt={event.title} className="event-image" />
                                <div className="event-overlay"></div>
                            </div>
                            <div className="event-content">
                                <h3 className="event-title">{event.title}</h3>
                                <div className="event-info">
                                    <span className="info-item">
                                        <Calendar size={18} />
                                        <span>2025</span>
                                    </span>
                                    <span className="info-item">
                                        <MapPin size={18} />
                                        <span>{event.location}</span>
                                    </span>
                                </div>

                                <button
                                    className="event-btn cancel-btn"
                                    onClick={() => handleCancel(event.id)}
                                >
                                    <XCircle size={20} />
                                    <span>Cancelar Participación</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;
