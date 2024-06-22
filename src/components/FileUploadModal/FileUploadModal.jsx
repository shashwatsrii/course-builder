import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './FileUploadModal.module.css';

Modal.setAppElement('#root');

const FileUploadModal = ({ isOpen, onRequestClose, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
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
        <h2>Upload File</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className={styles.buttons}>
          <button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleUpload} className={styles.uploadButton}>Upload</button>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
