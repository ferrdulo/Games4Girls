import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import './PublisherCard.css';

const PublisherCard = ({ publisher }) => {
    return (
        <Link to={`/publisher/${publisher.id}`} className="publisher-card-link">
            <div className="publisher-card glass-morphism">
                <div
                    className="publisher-card-image"
                    style={{ backgroundImage: `url(${publisher.image_background})` }}
                >
                    <div className="publisher-overlay">
                        <span className="games-count">
                            <Gamepad2 size={14} />
                            {publisher.games_count} Juegos
                        </span>
                    </div>
                </div>
                <div className="publisher-card-content">
                    <h3 className="publisher-card-name">{publisher.name}</h3>
                </div>
            </div>
        </Link>
    );
};

export default PublisherCard;
