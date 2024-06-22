import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateModuleModal from '../CreateModule/CreateModuleModal';
import FileUploadModal from '../FileUploadModal/FileUploadModal';
import styles from './Header.module.css';

const Header = ({ onCreateModule, onUpload, onAddLink }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
    setDropdownVisible(false);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
    setDropdownVisible(false);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
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
            <p onClick={openCreateModal}>Create module</p>
            <p onClick={onAddLink}>Add a link</p>
            <p onClick={openUploadModal}>Upload</p>
          </div>
        )}
      </div>
      <CreateModuleModal
        isOpen={createModalOpen}
        onRequestClose={closeCreateModal}
        onCreate={onCreateModule}
      />
      <FileUploadModal
        isOpen={uploadModalOpen}
        onRequestClose={closeUploadModal}
        onUpload={onUpload}
      />
    </div>
  );
};

export default Header;
