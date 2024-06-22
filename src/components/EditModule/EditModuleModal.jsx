import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './EditModuleModal.module.css';

Modal.setAppElement('#root');

const EditModuleModal = ({ isOpen, onRequestClose, onEdit, initialName, modalTitle }) => {
    const [name, setName] = useState(initialName);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleEdit = () => {
        if (name.trim()) {
            onEdit(name);
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
                <h2>{modalTitle}</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <div className={styles.buttons}>
                    <button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={handleEdit} className={styles.createButton}>Save Changes</button>
                </div>
            </div>
        </Modal>
    );
};

export default EditModuleModal;
