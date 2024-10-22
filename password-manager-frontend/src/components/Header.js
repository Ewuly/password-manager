import React from 'react';

const Header = ({ onSelect }) => {
    return (
        <header className="header">
            <h1>Gestionnaire de Mots de Passe</h1>
            <nav>
                <button onClick={() => onSelect('add')}>Créer/Ajouter un Mot de Passe</button>
                <button onClick={() => onSelect('delete')}>Supprimer un Mot de Passe</button>
                <button onClick={() => onSelect('edit')}>Modifier un Mot de Passe</button>
            </nav>
        </header>
    );
};

export default Header;
