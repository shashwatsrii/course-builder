import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { FaEllipsisV } from 'react-icons/fa';
import EditModuleModal from '../EditModule/EditModuleModal';
import Resource from '../Resource/Resource';
import LinkItem from '../LinkItem/LinkItem';
import styles from './Module.module.css';

const Module = ({ module, onEditModule, onDeleteModule, moveItemToModule }) => {
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

  const [{ isOver }, drop] = useDrop({
    accept: ['resource', 'link'],
    drop: (item) => moveItemToModule(item.id, item.type, module.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`${styles.module} ${isOver ? styles.highlight : ''}`}>
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
      {module.resources.map((resource) => (
        <Resource
          key={resource.id}
          resource={resource}
          onRename={() => {}}
          onDownload={() => {}}
          onDelete={() => {}}
          isPartOfModule
        />
      ))}
      {module.links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onEdit={() => {}}
          onDelete={() => {}}
          isPartOfModule
        />
      ))}
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
