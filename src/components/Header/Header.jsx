import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateModuleModal from '../CreateModule/CreateModuleModal';
import styles from './Header.module.css';

const Header = ({ onCreateModule }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openModal = () => {
    setModalOpen(true);
    setDropdownVisible(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.header}>
      <h1>Course builder</h1>
      <div className={styles.addButton}>
        <button onClick={toggleDropdown}>
          <FaPlus /> Add
        </button>
        {dropdownVisible && (
          <div className={styles.dropdown}>
            <p onClick={openModal}>Create module</p>
            <p>Add a link</p>
            <p>Upload</p>
          </div>
        )}
      </div>
      <CreateModuleModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        onCreate={onCreateModule}
      />
    </div>
  );
};

export default Header;
