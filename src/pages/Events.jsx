import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, joinEvent, cancelEvent } from '../redux/actions/eventActions';
import { Calendar, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import './Events.css';

const Events = () => {
    const dispatch = useDispatch();
    const { list: events, joinedEvents, loading, error } = useSelector(state => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const isJoined = (id) => joinedEvents.some(e => e.id === id);

    const handleJoin = (event) => {
        dispatch(joinEvent(event));
    };

    const handleCancel = (id) => {
        dispatch(cancelEvent(id));
    };

    if (loading) return <div className="loading">Cargando eventos...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="events-container section-padding">
            <h1 className="section-title">Próximos Eventos</h1>
            <p className="section-subtitle">Únete a la mejor comunidad gaming femenina</p>

            <div className="events-grid">
                {events.map(event => (
                    <div key={event.id} className="event-card glass-morphism">
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

                            <div className="event-actions">
                                {isJoined(event.id) ? (
                                    <button
                                        className="event-btn cancel-btn"
                                        onClick={() => handleCancel(event.id)}
                                    >
                                        <XCircle size={20} />
                                        <span>Cancelar Participación</span>
                                    </button>
                                ) : (
                                    <button
                                        className="event-btn join-btn"
                                        onClick={() => handleJoin(event)}
                                    >
                                        <CheckCircle2 size={20} />
                                        <span>Apuntarme</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
