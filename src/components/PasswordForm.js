import React, { useState } from 'react';
import axios from 'axios';

const PasswordForm = ({ onPasswordAdded }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // État pour afficher/cacher le mot de passe

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/passwords', { username, password });
        onPasswordAdded();
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="password-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                required
            />
            <div className="password-input-container">
                <input
                    type={showPassword ? 'text' : 'password'} // Change le type selon l'état
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)} // Inverse l'état
                >
                    {showPassword ? '👁️' : '👁️‍🗨️'} {/* Affiche un œil pour montrer/cacher */}
                </button>
            </div>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default PasswordForm;
