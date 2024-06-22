import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './AddLinkModal.module.css';

Modal.setAppElement('#root');

const AddLinkModal = ({ 
  isOpen, 
  onRequestClose, 
  onSubmit, 
  initialUrl = '', 
  initialDisplayName = '', 
  mode = 'add' 
}) => {
  const [url, setUrl] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    setUrl(initialUrl);
    setDisplayName(initialDisplayName);
  }, [initialUrl, initialDisplayName]);

  const handleSubmit = () => {
    if (url.trim() && displayName.trim()) {
      onSubmit({ url, displayName });
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
        <h2>{mode === 'add' ? 'Add new link' : 'Edit link'}</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display name"
        />
        <div className={styles.buttons}>
          <button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSubmit} className={styles.addButton}>
            {mode === 'add' ? 'Add' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddLinkModal;
