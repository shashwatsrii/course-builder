import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import EditModuleModal from '../EditModule/EditModuleModal';
import styles from './Module.module.css';

const Module = ({ module, onEditModule, onDeleteModule }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDropdownVisible(false);
  };

  const handleSave = (newName) => {
    onEditModule(module.id, newName);
    setIsEditing(false);
  };

  return (
    <div className={styles.module}>
      <div className={styles.moduleHeader}>
        <h3>{module.name}</h3>
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
      {isEditing && (
        <EditModuleModal
          isOpen={isEditing}
          onRequestClose={() => setIsEditing(false)}
          onEdit={handleSave}
          initialName={module.name}
          modalTitle="Edit Module"
        />
      )}
    </div>
  );
};

export default Module;
