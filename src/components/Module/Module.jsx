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

  const openEditModal = () => {
    setIsEditing(true);
    setDropdownVisible(false);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleEdit = (newName) => {
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
            <p onClick={openEditModal}>Edit module name</p>
            <p onClick={() => onDeleteModule(module.id)}>Delete</p>
          </div>
        )}
      </div>
      <p>Add items to this module</p>
      <EditModuleModal
        isOpen={isEditing}
        onRequestClose={closeEditModal}
        onEdit={handleEdit}
        initialName={module.name}
      />
    </div>
  );
};

export default Module;
