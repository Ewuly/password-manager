import React, { useState } from 'react';
import axios from 'axios';

const AddPassword = ({ onPasswordAdded }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userPasswordsCount, setUserPasswordsCount] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            const response = await axios.post('http://localhost:5000/api/passwords', { username, password });
            onPasswordAdded();
            setUsername('');
            setPassword('');
            setUserPasswordsCount(response.data.userPasswordsCount);
            setMessage({ text: response.data.message, type: 'success' });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Erreur 400:', error.response.data);
                setMessage({ text: error.response.data.error, type: 'error' });
            } else {
                console.error('Erreur lors de l\'ajout du mot de passe:', error);
                setMessage({ text: 'Erreur lors de l\'ajout du mot de passe.', type: 'error' });
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="password-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
            {message.text && (
                <p className={message.type === 'success' ? 'success' : 'alert'}>{message.text}</p>
            )}
            {userPasswordsCount !== null && (
                <p>Vous avez actuellement {userPasswordsCount} mot(s) de passe associé(s) à cet utilisateur.</p>
            )}
        </div>
    );
};

export default AddPassword;
