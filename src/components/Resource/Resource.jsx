import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaEllipsisV } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import EditModuleModal from '../EditModule/EditModuleModal';
import styles from './Resource.module.css';

const Resource = ({ resource, onRename, onDownload, onDelete, isPartOfModule }) => {
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

  const [{ isDragging }, drag] = useDrag({
    type: 'resource',
    item: { id: resource.id, type: 'resource' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={!isPartOfModule ? drag : null} className={styles.resource} style={{ opacity }}>
      <IoDocumentText className={styles.resourceIcon} />
      <div className={styles.resourceDetails}>
        <span className={styles.resourceName}>{resource.name}</span>
        <span className={styles.resourceType}>PDF</span>
      </div>
      {!isPartOfModule && (
        <button onClick={toggleDropdown} className={styles.kebabButton}>
          <FaEllipsisV />
        </button>
      )}
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
