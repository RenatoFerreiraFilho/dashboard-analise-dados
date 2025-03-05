import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="user-menu-container">
            {/* Botão Suspenso */}
            <button className="user-menu-button" onClick={() => setIsOpen(!isOpen)}>
                👤
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
                <div className="user-menu-dropdown">
                    <p>
                        <strong>{user.name}</strong>
                    </p>
                    <p>{user.email}</p>
                    <button className="logout-button" onClick={onLogout}>
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
