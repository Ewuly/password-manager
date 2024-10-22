import React, { useState } from 'react';
import axios from 'axios';

const DeletePassword = ({ onPasswordDeleted }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [remainingPasswordsCount, setRemainingPasswordsCount] = useState(null);

    const handleDelete = async (e) => {
        e.preventDefault();
        setAlertMessage('');
        setRemainingPasswordsCount(null);

        try {
            const response = await axios.delete('http://localhost:5000/api/passwords', {
                data: { username, password }
            });
            onPasswordDeleted();
            setUsername('');
            setPassword('');
            setAlertMessage('Mot de passe supprimé avec succès.');
            setRemainingPasswordsCount(response.data.remainingPasswordsCount);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setAlertMessage(error.response.data.error);
                } else {
                    setAlertMessage('Erreur lors de la suppression du mot de passe.');
                }
            } else {
                setAlertMessage('Erreur de connexion au serveur.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleDelete} className="password-form">
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
                    placeholder="Mot de passe à supprimer"
                    required
                />
                <button type="submit">Supprimer</button>
            </form>
            {alertMessage && <p className="alert">{alertMessage}</p>}
        </div>
    );
};

export default DeletePassword;
