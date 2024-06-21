import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './CreateModuleModal.module.css';

Modal.setAppElement('#root');

const CreateModuleModal = ({ isOpen, onRequestClose, onCreate }) => {
  const [moduleName, setModuleName] = useState('');

  const handleCreate = () => {
    if (moduleName.trim()) {
      onCreate(moduleName);
      setModuleName('');
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.container}>
        <h2>Create new module</h2>
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Module name"
        />
        <div className={styles.buttons}>
          <button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleCreate} className={styles.createButton}>Create</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModuleModal;
