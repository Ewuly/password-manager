import React, { useState } from 'react';
import axios from 'axios';

const EditPassword = ({ onPasswordEdited }) => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleEdit = async (e) => {
        e.preventDefault();
        setAlertMessage('');

        try {
            const response = await axios.put('http://localhost:5000/api/passwords', {
                username,
                oldPassword,
                newPassword
            });
            
            onPasswordEdited();
            setUsername('');
            setOldPassword('');
            setNewPassword('');
            setAlertMessage('Mot de passe modifié avec succès.');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setAlertMessage(error.response.data.error);
                } else if (error.response.status === 400) {
                    setAlertMessage(error.response.data.error || 'Erreur lors de la modification du mot de passe.');
                } else {
                    setAlertMessage('Erreur lors de la modification du mot de passe.');
                }
            } else {
                setAlertMessage('Erreur de connexion au serveur.');
            }
        }
    };

    return (
        <form onSubmit={handleEdit} className="password-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                required
            />
            <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Ancien mot de passe"
                required
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                required
            />
            <button type="submit">Modifier</button>
            {alertMessage && <p className={alertMessage.includes('succès') ? 'success' : 'alert'}>{alertMessage}</p>}
        </form>
    );
};

export default EditPassword;
