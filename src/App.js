import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import './App.css';

const App = () => {
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () => {
        const response = await axios.get('http://localhost:5000/api/passwords');
        setPasswords(response.data);
    };

    const handlePasswordAdded = () => {
        fetchPasswords();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/passwords/${id}`);
        fetchPasswords();
    };

    useEffect(() => {
        fetchPasswords();
    }, []);

    return (
        <div className="app">
            <h1>Gestionnaire de Mots de Passe</h1>
            <PasswordForm onPasswordAdded={handlePasswordAdded} />
            <PasswordList passwords={passwords} onDelete={handleDelete} />
        </div>
    );
};

export default App;
