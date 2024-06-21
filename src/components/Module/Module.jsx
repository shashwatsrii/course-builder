import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import styles from './Module.module.css';

const Module = ({ module, onEditModule, onDeleteModule }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(module.name);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDropdownVisible(false);
  };

  const handleSave = () => {
    onEditModule(module.id, newName);
    setIsEditing(false);
  };

  return (
    <div className={styles.module}>
      <div className={styles.moduleHeader}>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleSave}
          />
        ) : (
          <h3>{module.name}</h3>
        )}
        <button onClick={toggleDropdown}>
          <FaEllipsisV />
        </button>
        {dropdownVisible && (
          <div className={styles.dropdown}>
            <p onClick={handleEdit}>Edit module name</p>
            <p onClick={() => onDeleteModule(module.id)}>Delete</p>
          </div>
        )}
      </div>
      <p>Add items to this module</p>
    </div>
  );
};

export default Module;
