import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddPassword from './components/AddPassword';
import DeletePassword from './components/DeletePassword';
import EditPassword from './components/EditPassword';
import './App.css';

const App = () => {
    const [currentView, setCurrentView] = useState('add');
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/passwords');
            setPasswords(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des mots de passe:', error);
        }
    };

    const handlePasswordAdded = () => {
        fetchPasswords();
    };

    const handlePasswordDeleted = () => {
        fetchPasswords();
    };

    const handlePasswordEdited = () => {
        fetchPasswords();
    };

    useEffect(() => {
        fetchPasswords();
    }, []);

    return (
        <div className="app">
            <Header onSelect={setCurrentView} />
            {currentView === 'add' && <AddPassword onPasswordAdded={handlePasswordAdded} />}
            {currentView === 'delete' && <DeletePassword onPasswordDeleted={handlePasswordDeleted} />}
            {currentView === 'edit' && <EditPassword onPasswordEdited={handlePasswordEdited} />}
        </div>
    );
};

export default App;
