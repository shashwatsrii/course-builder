import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import EditModuleModal from '../EditModule/EditModuleModal';
import styles from './Resource.module.css';

const Resource = ({ resource, onRename, onDownload, onDelete }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRename = () => {
    setIsEditing(true);
    setDropdownVisible(false);
  };

  const handleSave = (newName) => {
    onRename(resource.id, newName);
    setIsEditing(false);
  };

  return (
    <div className={styles.resource}>
      <span className={styles.resourceName}>{resource.name}</span>
      <button onClick={toggleDropdown} className={styles.kebabButton}>
        <FaEllipsisV />
      </button>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <p onClick={handleRename}>Rename</p>
          <p onClick={() => onDownload(resource.file)}>Download</p>
          <p onClick={() => onDelete(resource.id)}>Delete</p>
        </div>
      )}
      {isEditing && (
        <EditModuleModal
          isOpen={isEditing}
          onRequestClose={() => setIsEditing(false)}
          onEdit={handleSave}
          initialName={resource.name}
          modalTitle="Rename File"
        />
      )}
    </div>
  );
};

export default Resource;
