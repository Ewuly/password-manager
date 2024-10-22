import React from 'react';

const PasswordList = ({ passwords, onDelete }) => {
    return (
        <ul className="password-list">
            {passwords.map((pwd, index) => (
                <li key={index}>
                    <span>{pwd.username}: {pwd.password}</span>
                    <button onClick={() => onDelete(pwd._id)}>Supprimer</button>
                </li>
            ))}
        </ul>
    );
};

export default PasswordList;
